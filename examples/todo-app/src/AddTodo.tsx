import { Maybe } from '../../../dist/types/types';
import { appendTodo, createTodo, Todos } from './methods';
import { constant, either, extract, left, pipe, right } from 'ts-combinators';

export function AddTodo({ todos, onSubmit }: { todos: Todos; onSubmit: (todos: Todos) => void }) {
  const addTodo = pipe(
    either((s: Maybe<string>) => (s ? s : null))(constant('A todo title cannot be empty')),
    right(createTodo),
    right(appendTodo(todos)),
    right(onSubmit),
    left(console.log),
    extract
  );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title')?.toString();
        addTodo(title);
      }}
    >
      <fieldset
        style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: 10,
          border: 0,
          paddingBottom: 20,
          borderBottom: '1px solid #444',
          marginBottom: 20,
        }}
      >
        <input
          type="text"
          placeholder="Task to add"
          name="title"
          style={{
            fontSize: 17,
            padding: '2px 8px',
          }}
        />
        <button
          type="submit"
          style={{
            fontSize: 14,
          }}
        >
          Create todo
        </button>
      </fieldset>
    </form>
  );
}
