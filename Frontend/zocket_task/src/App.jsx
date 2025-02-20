import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./styles/global.css";

const socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("Welcome to AI Task Manager!");

  useEffect(() => {
    socket.on("connect", () => console.log("Connected to WebSocket"));
    return () => socket.disconnect();
  }, []);

  return (
    <div className="container">
      <h1>{message}</h1>
    </div>
  );
}

export default App;
