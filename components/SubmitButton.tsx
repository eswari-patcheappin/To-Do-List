
"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  isEditing: boolean;
}

export default function SubmitButton({
  isEditing,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="primary-button"
      disabled={pending}
    >
      {pending
        ? "Saving..."
        : isEditing
        ? "✓ Update Task"
        : "+ Add Task"}
    </button>
  );
}
