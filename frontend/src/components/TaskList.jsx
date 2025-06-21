
import React from "react";
import { useEffect, useState } from "react";

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
    const base = "text-xs font-semibold px-3 py-1 rounded-full ";
    if (status === "To Do") return base + "bg-yellow-100 text-yellow-800";
    if (status === "In Progress") return base + "bg-blue-100 text-blue-800";
    if (status === "Done") return base + "bg-green-100 text-green-800";
    return base + "bg-gray-100 text-gray-800";
  };

  return (
    <div className="mt-8 max-w-4xl mx-auto px-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          placeholder="Filter by assignee"
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setFilters({ ...filters, assignedTo: e.target.value })
          }
        />
        <select
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>

      {/* Task Cards */}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm transition hover:shadow-md"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {task.title}
              </h3>
              <span className={getStatusBadge(task.status)}>
                {task.status}
              </span>
            </div>
            <p className="text-gray-700 mb-2">{task.description}</p>
            <p className="text-sm text-gray-500 mb-4">
              Assigned to:{" "}
              <span className="font-medium text-gray-800">
                {task.assignedTo}
              </span>
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <select
                value={task.status}
                onChange={(e) => updateStatus(task._id, e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>

              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-600 hover:text-red-700 font-medium transition"
              >
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
