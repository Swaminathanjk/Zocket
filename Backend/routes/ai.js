const express = require("express");
const jwt = require("jsonwebtoken");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// Gemini AI Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @route   POST /api/ai/suggest
// @desc    Generate AI-powered task suggestions
router.post("/suggest", authMiddleware, async (req, res) => {
  try {
    const { userInput } = req.body;
    if (!userInput)
      return res.status(400).json({ msg: "User input is required" });

    console.log("Requesting Gemini suggestion for:", userInput);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const response = await model.generateContent(userInput);
    const text = response.response.text();

    
    res.json({ suggestion: text });
  } catch (err) {
    console.error("Gemini API Error:", err.message);
    res.status(500).json({ msg: "AI service error", error: err.message });
  }
});

module.exports = router;
