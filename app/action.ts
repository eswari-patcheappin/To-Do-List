"use server";
import { connectDB } from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import Task from "@/models/Task";
import { z } from "zod";

export async function createTask(formData: FormData): Promise<{ error: string }> {
    const title = formData.get("title");

    const result = taskSchema.safeParse({ title });
    /*if (typeof title !== "string" || title.trim().length === 0) {
        console.error("Title is required");
        return;
    }*/
    if (!result.success) {
        return { error: result.error.issues[0].message };
    }
    await connectDB();
    await Task.create({ title: result.data.title });
    revalidatePath("/");
    return {error: ""};
}

const taskSchema = z.object({
    title: z.string().trim().min(3).max(50),
});

export async function deleteTask(id: string ): Promise<void> {
    await connectDB();
    await Task.findByIdAndDelete(id);
    revalidatePath("/");
}

export async function toggleTask(id: string, completed:boolean): Promise<void>{
    await connectDB();
    await Task.findByIdAndUpdate(id, { completed: completed });
    revalidatePath("/");
}

export async function updateTask(id: string, title:string): Promise<void>{
    await connectDB();
    if (title.trim().length === 0) {
        throw new Error("Title is Empty");
    }
    await Task.findByIdAndUpdate(id, { title: title.trim() });
    revalidatePath("/");
}