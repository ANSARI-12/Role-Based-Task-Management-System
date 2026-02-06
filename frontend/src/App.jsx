import { useState } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser && storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : null;
  });

  const [showRegister, setShowRegister] = useState(false);

  const [refreshTasks, setRefreshTasks] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  if (!token) {
    return (
      <div style={{ padding: 20 }}>
        {showRegister ? (
          <>
            <Register />
            <p>
              Already have account?{" "}
              <button onClick={() => setShowRegister(false)}>Login</button>
            </p>
          </>
        ) : (
          <>
            <Login setToken={setToken} setUser={setUser} />
            <p>
              Don’t have account?{" "}
              <button onClick={() => setShowRegister(true)}>Register</button>
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>

      <button onClick={handleLogout}>Logout</button>

      <hr />

      <TaskForm onTaskCreated={() => setRefreshTasks((prev) => prev + 1)} />

      <hr />

      <TaskList refresh={refreshTasks} user={user} />
    </div>
  );
}

export default App;
