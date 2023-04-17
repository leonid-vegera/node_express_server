'use strict';

import { v4 as uuidv4 } from 'uuid';

export let todos = [
  { id: '1', title: 'HTML', completed: true },
  { id: '2', title: 'CSS', completed: false },
  { id: '3', title: 'React', completed: true },
  { id: '4', title: 'Vue', completed: false },
  { id: '5', title: 'Node', completed: false },
  { id: '6', title: 'Angular', completed: false },
];

export function getAll() {
  return todos;
}

export function getById(todoId) {
  const foundTodo = todos.find((todo) => todo.id === todoId);
  return foundTodo || null;
}

export function creat(title) {
  const newTodo = {
    id: uuidv4(),
    title,
    completed: false,
  };

  todos.push(newTodo);

  return newTodo;
}

export function remove(todoId) {
  todos = todos.filter((todo) => todo.id !== todoId);
}

export function removeMany(ids) {
  if (!ids.every(getById)) {
    throw new Error();
  }
  todos = todos.filter((todo) => !ids.includes(todo.id));
}

export function update({ id, title, completed }) {
  const todo = getById(id);
  Object.assign(todo, { title, completed });
  return todo;
}
