import React from 'react';
import { useState } from "react";

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
      className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-4 w-full max-w-2xl mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Create New Task
      </h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium text-gray-600">
          Title
        </label>
        <input
          id="title"
          name="title"
          placeholder="Enter task title"
          value={task.title}
          onChange={handleChange}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-600"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter task description"
          value={task.description}
          onChange={handleChange}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none h-24"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="assignedTo"
          className="text-sm font-medium text-gray-600"
        >
          Assigned To
        </label>
        <input
          id="assignedTo"
          name="assignedTo"
          placeholder="Enter team member's name"
          value={task.assignedTo}
          onChange={handleChange}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="status" className="text-sm font-medium text-gray-600">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={task.status}
          onChange={handleChange}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2 rounded-lg"
      >
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;

