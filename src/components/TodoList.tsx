import { useState } from "react";
import { Todo } from "../contexts/TodoContext";
import { FaCheck, FaFloppyDisk, FaPencil, FaTrash } from "react-icons/fa6";

type TodoListProps = {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, updatedTodo: Todo) => void;
};

const TodoList = ({ todos, deleteTodo, updateTodo }: TodoListProps) => {
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");

  const handleEdit = (todo: Todo) => {
    setEditingTodoId(todo.id);
    setNewTitle(todo.title);
  };

  const handleSave = async (todo: Todo) => {
    await updateTodo(todo.id, { ...todo, title: newTitle });
    setEditingTodoId(null);
  };

  return (
    <div className="space-y-4">
      {todos.map((todo: Todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between gap-2 p-4 bg-white shadow-md rounded-lg"
        >
          {editingTodoId === todo.id ? (
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border border-gray-300 rounded p-2 flex-1"
            />
          ) : (
            <p
              className={`${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.title}
            </p>
          )}
          <div className="flex items-center space-x-4">
            {editingTodoId === todo.id ? (
              <FaFloppyDisk
                className="cursor-pointer text-blue-500"
                onClick={() => handleSave(todo)}
              />
            ) : (
              <>
                <FaPencil
                  className="cursor-pointer text-yellow-500"
                  onClick={() => handleEdit(todo)}
                />
                <FaCheck
                  className="cursor-pointer text-green-500"
                  onClick={() =>
                    updateTodo(todo.id, { ...todo, completed: !todo.completed })
                  }
                />
                <FaTrash
                  className="cursor-pointer text-red-500"
                  onClick={() => deleteTodo(todo.id)}
                />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
