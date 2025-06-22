import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [refresh, setRefresh] = useState(0);
  const refreshTasks = () => setRefresh((r) => r + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8 drop-shadow-sm">
          Task Manager 🗂️
        </h1>
        <TaskForm refreshTasks={refreshTasks} />
        <TaskList refresh={refresh} />
      </div>
    </div>
  );
}

export default App;
