import { type Todo } from './methods';

export function Todo({ todo }: { todo: Todo }) {
  return (
    <li
      style={{
        display: 'grid',
        gap: 8,
      }}
    >
      <form>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <input type="checkbox" checked={todo.done} onChange={() => {}} />
          <p style={{ fontSize: 20 }}>{todo.title}</p>
        </label>
      </form>
      <button>&times; Delete</button>
    </li>
  );
}
