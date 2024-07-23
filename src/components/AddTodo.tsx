import React, { useState } from "react";

type AddTodoProps = {
  addTodo: (title: string) => void;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTodo = ({ addTodo, error, setError }: AddTodoProps) => {
  const [title, setTitle] = useState("");

  return (
    <div className="p-6 pb-0 flex items-center justify-start gap-1 w-full">
      <input
        type="text"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
          setError(false);
        }}
        className={`${error ? 'border-red-400' : 'border-gray-600'} border rounded-lg p-2 w-full`}
      />
      <button
        className="px-6 py-2 bg-black text-white rounded-lg"
        onClick={() => {
          addTodo(title);
          setTitle("");
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddTodo;
