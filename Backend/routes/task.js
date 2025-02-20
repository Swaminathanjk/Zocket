const express = require("express");
const { body, validationResult } = require("express-validator");
const Task = require("../models/Task");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// @route   POST /api/tasks
// @desc    Create a new task
router.post("/", authMiddleware, [
  body("title").notEmpty().withMessage("Title is required")
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { title, description, dueDate } = req.body;
    const task = new Task({ user: req.user, title, description, dueDate });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/tasks
// @desc    Get all tasks for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.user.toString() !== req.user) return res.status(403).json({ msg: "Not authorized" });

    task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.user.toString() !== req.user) return res.status(403).json({ msg: "Not authorized" });

    await task.deleteOne();
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
