
"use client";

import { useState } from "react";
import { Task } from "../type";
import {
  createTask,
  deleteTask,
  toggleTask,
  updateTask,
} from "@/app/action";
import SubmitButton from "./SubmitButton";

interface TodoClientProps {
  initialTasks: Task[];
}

type TaskFilter = "All" | "Pending" | "Completed";

export default function TodoClient({
  initialTasks,
}: TodoClientProps) {
  const tasks = initialTasks;

  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TaskFilter>("All");

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const filteredTasks = tasks.filter((item) => {
    const matchSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "All" ||
      (filter === "Pending" && !item.completed) ||
      (filter === "Completed" && item.completed);

    return matchSearch && matchFilter;
  });

  async function handleSubmit(formData: FormData) {
    try {
      setError("");

      if (editId === null) {
        const result = await createTask(formData);

        if (result.error) {
          setError(result.error);
          return;
        }
      } else {
        const title = formData.get("title");

        if (
          typeof title !== "string" ||
          title.trim().length === 0
        ) {
          setError("Task title cannot be empty");
          return;
        }

        await updateTask(editId, title.trim());
      }

      setTask("");
      setEditId(null);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  function editTask(id: string) {
    const selectedTask = tasks.find((item) => item.id === id);

    if (selectedTask) {
      setTask(selectedTask.title);
      setEditId(id);
      setError("");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  function cancelEdit() {
    setEditId(null);
    setTask("");
    setError("");
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await deleteTask(id);

      if (editId === id) {
        cancelEdit();
      }
    } catch {
      setError("Unable to delete task. Please try again.");
    }
  }

  async function handleToggle(id: string, completed: boolean) {
    try {
      await toggleTask(id, completed);
    } catch {
      setError("Unable to update task status.");
    }
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">✓</div>
          <span>TaskFlow</span>
        </div>

        <p className="sidebar-label">WORKSPACE</p>

        <div className="nav-item active">
          <span>▦</span>
          <span>Dashboard</span>
        </div>

        <div className="sidebar-bottom">
          <strong>TaskFlow</strong>
          <div>Stay focused. Get things done.</div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="eyebrow">My workspace</span>
            <h1 className="page-title">Task Dashboard</h1>
            <p className="page-subtitle">
              Organize your day and track your progress.
            </p>
          </div>

          <div className="avatar">TF</div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-top">
              <span className="stat-label">Total Tasks</span>
              <span className="stat-icon purple">▦</span>
            </div>
            <div className="stat-number">{totalTasks}</div>
            <span className="stat-footer">All your tasks</span>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span className="stat-label">Pending</span>
              <span className="stat-icon orange">◷</span>
            </div>
            <div className="stat-number">{pendingTasks}</div>
            <span className="stat-footer">Still to complete</span>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span className="stat-label">Completed</span>
              <span className="stat-icon green">✓</span>
            </div>
            <div className="stat-number">{completedTasks}</div>
            <span className="stat-footer">Great work so far</span>
          </div>
        </section>

        <section className="progress-card">
          <div className="progress-header">
            <div>
              <h2 className="section-heading">Your Progress</h2>
              <span className="muted">
                {completedTasks} of {totalTasks} tasks completed
              </span>
            </div>

            <span className="progress-percent">{progress}%</span>
          </div>

          <div
            className="progress-track"
            role="progressbar"
            aria-label="Task completion progress"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        <section className="add-card">
          <h2 className="section-heading">
            {editId ? "Edit Task" : "Create New Task"}
          </h2>

          <p className="muted">
            {editId
              ? "Update your task details below."
              : "What would you like to accomplish?"}
          </p>

          <form action={handleSubmit} className="task-form">
            <input
              className="task-input"
              type="text"
              name="title"
              placeholder="e.g. Complete Next.js project"
              value={task}
              onChange={(e) => {
                setTask(e.target.value);
                setError("");
              }}
            />

            <SubmitButton isEditing={editId !== null} />

            {editId && (
              <button
                type="button"
                className="cancel-button"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </form>

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}
        </section>

        <section className="tasks-panel">
          <div className="tasks-header">
            <div>
              <h2 className="section-heading">
                My Tasks
                <span className="task-count">{totalTasks}</span>
              </h2>
              <span className="muted">
                Manage and organize your tasks
              </span>
            </div>
          </div>

          <div className="search-row">
            <div className="search-wrap">
              <input
                className="search-input"
                type="search"
                placeholder="Search your tasks..."
                aria-label="Search tasks"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search && (
                <button
                  type="button"
                  className="clear-button"
                  onClick={() => setSearch("")}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="filter-tabs">
            {(["All", "Pending", "Completed"] as TaskFilter[]).map(
              (option) => (
                <button
                  key={option}
                  type="button"
                  className={`filter-button ${
                    filter === option ? "selected" : ""
                  }`}
                  onClick={() => setFilter(option)}
                  aria-pressed={filter === option}
                >
                  {option}
                </button>
              )
            )}
          </div>

          <div className="task-list">
            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">☑</div>
                <h3>No tasks found</h3>
                <p>
                  {search || filter !== "All"
                    ? "Try changing your search or filter."
                    : "Add your first task to get started."}
                </p>
              </div>
            ) : (
              filteredTasks.map((item) => (
                <div className="task-item" key={item.id}>
                  <input
                    className="task-checkbox"
                    type="checkbox"
                    checked={item.completed}
                    aria-label={`Mark ${item.title} as ${
                      item.completed ? "pending" : "completed"
                    }`}
                    onChange={() =>
                      handleToggle(item.id, !item.completed)
                    }
                  />

                  <div className="task-info">
                    <p
                      className={`task-name ${
                        item.completed ? "done" : ""
                      }`}
                    >
                      {item.title}
                    </p>

                    <span
                      className={`status ${
                        item.completed ? "completed" : "pending"
                      }`}
                    >
                      {item.completed ? "✓ Completed" : "◷ Pending"}
                    </span>
                  </div>

                  <div className="task-actions">
                    <button
                      type="button"
                      className="action-button edit-button"
                      onClick={() => editTask(item.id)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="action-button delete-button"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
