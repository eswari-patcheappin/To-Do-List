import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";
import TodoClient from "@/components/TodoClient";
import { connection } from "next/server";
import { Suspense } from "react";

//fetch task content
async function TaskContent() {
  await connection();
  await connectDB();
  const dbTask = await Task.find();

  const tasks = dbTask.map((task) => ({
      id : task._id.toString(),
      title : task.title,
      completed :task.completed
  }));

  return <TodoClient initialTasks={tasks}/>;
}

//render the page
export default async function Home() {  
  return (<Suspense fallback={<p>Loading Tasks...</p>}>
    <TaskContent />
  </Suspense>);
}