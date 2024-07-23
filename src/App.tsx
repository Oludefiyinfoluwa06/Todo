import { useContext } from "react";
import { TodoContext } from "./contexts/TodoContext";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const App = () => {
  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    return null;
  }

  const { todos, addTodo, updateTodo, deleteTodo } = todoContext;

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden">
      <div className="h-[400px] max-w-md mx-auto shadow-lg rounded-lg overflow-hidden">
        <AddTodo addTodo={addTodo} />
        <div className="overflow-y-auto h-[calc(100%-3rem)] p-6">
          <TodoList
            todos={todos}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
