import { createContext, ReactNode, useState, useEffect } from "react";
import axios from "axios";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type TodoContextType = {
  todos: Todo[];
  getTodos: () => void;
  addTodo: (title: string) => void;
  updateTodo: (id: number, updatedTodo: Todo) => void;
  deleteTodo: (id: number) => void;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<boolean>(false);

  const getTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async (title: string) => {
    try {
      if (!title) return setError(true);

      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title,
          completed: false,
        }
      );
      setTodos([response.data, ...todos]);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const updateTodo = async (id: number, updatedTodo: Todo) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        updatedTodo
      );
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const values: TodoContextType = {
    todos,
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    error,
    setError,
  };

  return <TodoContext.Provider value={values}>{children}</TodoContext.Provider>;
};
