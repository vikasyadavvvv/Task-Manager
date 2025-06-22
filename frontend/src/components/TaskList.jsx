import React, { useEffect, useState } from "react";

const TaskList = ({ refresh }) => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: "", assignedTo: "" });

  const fetchTasks = async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`http://localhost:5000/api/tasks?${query}`);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, [refresh, filters]);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const getStatusBadge = (status) => {
    const base = "text-xs font-bold px-3 py-1 rounded-full";
    if (status === "To Do") return `${base} bg-yellow-100 text-yellow-800`;
    if (status === "In Progress") return `${base} bg-blue-100 text-blue-800`;
    if (status === "Done") return `${base} bg-green-100 text-green-800`;
    return `${base} bg-gray-200 text-gray-800`;
  };

  return (
    <div className="mt-10 max-w-5xl mx-auto px-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          placeholder="🔍 Filter by assignee"
          className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800 shadow-sm"
          onChange={(e) =>
            setFilters({ ...filters, assignedTo: e.target.value })
          }
        />
        <select
          className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800 shadow-sm"
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">📋 All Status</option>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>

      {/* Task Cards */}
      <ul className="space-y-6">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-gradient-to-tr from-white to-indigo-50 border border-indigo-100 p-6 rounded-2xl shadow-md transition hover:shadow-lg"
          >
            {/* Title & Status */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-indigo-800">
                {task.title}
              </h3>
              <span className={getStatusBadge(task.status)}>
                {task.status}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-3">{task.description}</p>

            {/* Assignee */}
            <p className="text-sm text-gray-500 mb-4">
              Assigned to:{" "}
              <span className="font-semibold text-indigo-700">
                {task.assignedTo}
              </span>
            </p>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <select
                value={task.status}
                onChange={(e) => updateStatus(task._id, e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>

           <button
  onClick={() => deleteTask(task._id)}
  className="flex items-center gap-2 bg-red-100 text-red-700 hover:bg-red-200 active:bg-red-300 px-4 py-2 rounded-lg font-semibold text-sm transition duration-200 shadow-sm"
>
  <span>🗑️</span>
  Delete
</button>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
