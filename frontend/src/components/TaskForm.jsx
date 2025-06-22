import React, { useState } from "react";

const TaskForm = ({ refreshTasks }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "To Do",
  });

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    refreshTasks();
    setTask({ title: "", description: "", assignedTo: "", status: "To Do" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 p-8 rounded-3xl shadow-xl border border-indigo-200 w-full max-w-3xl mx-auto space-y-6"
    >
      <h2 className="text-3xl font-extrabold text-indigo-700 text-center">
        ✨ Create New Task
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-medium text-indigo-600">
            Task Title
          </label>
          <input
            id="title"
            name="title"
            placeholder="e.g. Fix navbar responsiveness"
            value={task.title}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800"
            required
          />
        </div>

        {/* Assigned To */}
        <div className="flex flex-col gap-2">
          <label htmlFor="assignedTo" className="text-sm font-medium text-indigo-600">
            Assigned To
          </label>
          <input
            id="assignedTo"
            name="assignedTo"
            placeholder="e.g. John Doe"
            value={task.assignedTo}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800"
            required
          />
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-sm font-medium text-indigo-600">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Briefly describe the task..."
          value={task.description}
          onChange={handleChange}
          className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800 resize-none h-28"
          required
        />
      </div>

      {/* Status */}
      <div className="flex flex-col gap-2">
        <label htmlFor="status" className="text-sm font-medium text-indigo-600">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={task.status}
          onChange={handleChange}
          className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800"
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-3 rounded-xl shadow-md text-lg"
      >
         Create Task
      </button>
    </form>
  );
};

export default TaskForm;
