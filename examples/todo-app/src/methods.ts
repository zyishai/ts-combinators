import { v4 } from 'uuid';

export type Todo = {
  id: string;
  title: string;
  done: boolean;
  created: number;
};

export type Todos = Todo[];

export const createTodo: (title: string) => Todo = (title) => ({
  id: v4(),
  title,
  done: false,
  created: Date.now(),
});

export const appendTodo: (list: Todos) => (item: Todo) => Todos = (list) => (item) => [
  ...list,
  item,
];

export const toggleTodo: (list: Todos) => (id: string) => Todos = (list) => (id) =>
  list.map((item) => ({
    ...item,
    done: item.id === id ? !item.done : item.done,
  }));

export const deleteTodo: (list: Todos) => (id: string) => Todos = (list) => (id) =>
  list.filter((item) => item.id !== id);

export const updateTodo: (list: Todos) => (id: string) => (title: string) => Todos =
  (list) => (id) => (title) =>
    list.map((item) => ({
      ...item,
      title: item.id === id ? title : item.title,
    }));
