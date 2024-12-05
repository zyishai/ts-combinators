import { type Todos } from './methods';
import { Todo } from './Todo';

export function TodoList({ todos }: { todos: Todos }) {
  return (
    <ul style={{ display: 'grid', gap: 16 }}>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
