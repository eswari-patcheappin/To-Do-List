"use client";
import { useState } from "react";
import { Task } from "../type";
import { createTask, deleteTask, toggleTask, updateTask } from "@/app/action";
import SubmitButton from "./SubmitButton";

interface TodoClientProps{
  initialTasks: Task[];
}


export default function TodoClient({initialTasks}:TodoClientProps) {

  const [task, setTask] = useState<string>("");
  const tasks = initialTasks;
  const [error, setError] = useState<string>("");
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  async function handleSubmit(formData: FormData) {
    if (editId == null) {
      const result = await createTask(formData);
      if (result.error) {
        setError(result.error);
        return;
      }
    } else {
      const title = formData.get("title");
      if (typeof title !=="string" || title.trim().length === 0 ) {
        throw new Error("Title is Empty");
      }
      await updateTask(editId,title);
    }
    setTask("");
    setEditId(null);
  }


  //adding task
  /*function addTask() {
    if (task.trim() === "") {
      return;
    }

    if (editId != null) {
      const changeTitle = tasks.map((item) => {
        if (item.id === editId) {
          return {...item,title:task};
        }
        return item;
      });
      setTasks(changeTitle);
      setTask("");
      setEditId(null);
    } else {
      const newTask = {
        id: Date.now().toString(),
        title: task,
        completed: false
      }
      setTasks([...tasks, newTask]);
    }
    setTask("");
  }*/

  //task completed status
  /*function toggleTask(id: string) {
    setTasks(
      tasks.map((value) => {
        if (value.id === id) {
          return { ...value, completed: !value.completed};
        }
        return value;
      })
    );
  }*/
  

  //delete Task
  /*function deleteTask(id: string) {
    setTasks(
      tasks.filter((num) => num.id !== id)
    );
  }*/

  //edit Task
  function editTask(id: string) {
    const newId = tasks.find((task) => task.id == id);
    
    if (newId) {
      setTask(newId.title);
      setEditId(id);
      setError("");
    }
  }

//clear search
  function clear() {
    setSearch("");
  }

  //search & filter
  const filteredTasks = tasks.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = (filter === "All") || (filter === "Pending" && !item.completed) || (filter === "Completed" && item.completed);

    return matchSearch && matchFilter;
  });
  
  const totalTasks = tasks.length;

const completedTasks = tasks.filter(
  (item) => item.completed
).length;

const pendingTasks = tasks.filter(
  (item) => !item.completed
).length;

  return (
    <div>
      <h1 style={{ fontSize: "20px" }}>Hello, user!</h1>
      <h1
        style={{
          padding: "8px",
          border: "1px solid black",
          margin: "20px",
          borderRadius: "30px",
          backgroundColor: "blue",
          color: "white",
          textAlign: "center",
          fontFamily: "Arial",
        }}
      >
        TO-DO List
      </h1>
      <p>Total Task: {totalTasks}</p>
      <p>Pending Task: {pendingTasks}</p>
      <p>Completed Task: {completedTasks}</p>

      <label style={{ margin: "10px" }}>Task : </label>
      <form action={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter the task"
          value={task}
          onChange={(e) => { setTask(e.target.value); setError(""); }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        <SubmitButton isEditing={editId!==null}/>
      </form>

      <div>
        <input
          type="text"
          name="search"
          placeholder="Search Task"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          style={{
            margin: "30px",
            padding: "8px",
            borderRadius: "10px",
            backgroundColor: "lightgrey",
          }}
          onClick={clear}
        >
          Clear
        </button>
      </div>

      <div>
        <button onClick={() => setFilter("All")} style={{margin:"50px"}}>All</button>

        <button onClick={() => setFilter("Pending")} style={{margin:"50px"}}>Pending</button>

        <button onClick={() => setFilter("Completed")} style={{margin:"50px"}}>Completed</button>
      </div>

      {filteredTasks.map((task) => (
        <div
          key={task.id}
          style={{
            margin: "15px",
            padding: "15px",
            border: "1px solid gray",
            borderRadius: "10px",
          }}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={()=>toggleTask(task.id,!task.completed)}
          />

          <p>
            Task Title:
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>
          </p>
          <p style={{ color: task.completed ? "green" : "red" }}>
            Status: {task.completed ? "Completed" : "Not Completed"}
          </p>

          <button
            onClick={() => editTask(task.id)}
            style={{
              padding: "10px",
              margin: "5px",
              backgroundColor: "lightgreen",
              borderRadius: "10px",
            }}
          >
            Edit
          </button>
          <button
            style={{
              padding: "10px",
              margin: "5px",
              backgroundColor: "lightpink",
              borderRadius: "10px",
            }}
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}