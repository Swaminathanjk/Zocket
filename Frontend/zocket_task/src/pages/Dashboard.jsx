import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState({});
  const [updatingTasks, setUpdatingTasks] = useState({});
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        "https://zocket-hzqo.onrender.com/api/auth/user",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const fetchTasks = async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        "https://zocket-hzqo.onrender.com/api/tasks",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const getAiSuggestion = async () => {
    if (!token) return alert("You must be logged in to use AI suggestions!");
    if (!aiPrompt.trim()) return alert("Enter a prompt for AI suggestion!");

    try {
      setLoadingAI(true);
      const res = await axios.post(
        "https://zocket-hzqo.onrender.com/api/ai/suggest",
        { userInput: aiPrompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAiSuggestion(res.data.suggestion);
    } catch (err) {
      console.error("Error fetching AI suggestion:", err);
    } finally {
      setLoadingAI(false);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!token) return alert("You must be logged in to add tasks!");
    try {
      setLoading(true);
      await axios.post("https://zocket-hzqo.onrender.com/api/tasks", newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      console.error("Error creating task:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    if (!token) return alert("You must be logged in to delete tasks!");
    try {
      setLoadingTasks((prev) => ({ ...prev, [id]: true }));
      await axios.delete(`https://zocket-hzqo.onrender.com/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    } finally {
      setLoadingTasks((prev) => ({ ...prev, [id]: false }));
    }
  };

  const updateTaskStatus = async (id, newStatus) => {
    if (!token) return alert("You must be logged in to update tasks!");
    try {
      setUpdatingTasks((prev) => ({ ...prev, [id]: true }));
      await axios.put(
        `https://zocket-hzqo.onrender.com/api/tasks/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    } finally {
      setUpdatingTasks((prev) => ({ ...prev, [id]: false }));
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const formatAiSuggestion = (suggestion) => {
    return suggestion
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **bold** to <strong>
      // .replace(/\*(.*?)\*/g, "<em>$1</em>") // Convert *italic* to <em>
      .replace(/\n/g, "<br>"); // Convert new lines to <br>
  };

  useEffect(() => {
    if (token) {
      fetchUser();
      fetchTasks();
    }
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Task Dashboard</h2>

      {user && <h3 className="welcome-message">Welcome, {user.name}!</h3>}

      

      {!token && (
        <p className="login-warning">
          You are not logged in. You can browse tasks but must log in to save
          changes.
        </p>
      )}

      {/* Task Creation Form */}
      <form onSubmit={createTask} className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>

      {/* AI Task Suggestions */}
      <div className="ai-section">
        <h3>AI Task Suggestions</h3>
        <input
          type="text"
          placeholder="Enter a task idea..."
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
        />
        <button onClick={getAiSuggestion} disabled={loadingAI}>
          {loadingAI ? "Generating..." : "Get AI Suggestion"}
        </button>

        {aiSuggestion && (
          <div
            className="ai-suggestion"
            dangerouslySetInnerHTML={{
              __html: formatAiSuggestion(aiSuggestion),
            }}
          ></div>
        )}
      </div>

      {/* Task List */}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <select
              className="task-status"
              value={task.status}
              onChange={(e) => updateTaskStatus(task._id, e.target.value)}
              disabled={!token || updatingTasks[task._id]}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <button
              className="delete-btn"
              onClick={() => deleteTask(task._id)}
              disabled={!token || loadingTasks[task._id]}
            >
              {loadingTasks[task._id] ? "Deleting..." : "Delete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
