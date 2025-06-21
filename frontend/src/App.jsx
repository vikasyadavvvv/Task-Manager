import React from 'react';
import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [refresh, setRefresh] = useState(0);
  const refreshTasks = () => setRefresh(r => r + 1);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Task Manager</h1>
      <TaskForm refreshTasks={refreshTasks} />
      <TaskList refresh={refresh} />
    </div>
  );
}

export default App;
