"use client";

import {useFormStatus} from "react-dom";

interface SubmitButtonProps{
    isEditing: boolean;
}

export default function SubmitButton({ isEditing }: SubmitButtonProps) {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending}
        style={{
            margin: "30px",
            padding: "8px",
            borderRadius: "10px",
            backgroundColor: "lightcoral",
            }}
        >
            {pending?"Saving...":isEditing?"Update Task":"Add Task"}
        </button>
    );
    
}