import { AddTodo } from './AddTodo';
import { Todos } from './methods';
import { TodoList } from './TodoList';
import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState<Todos>([]);

  return (
    <>
      <AddTodo todos={todos} onSubmit={setTodos} />
      <TodoList todos={todos} />
    </>
  );
}

export default App;
