'use strict';

import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';

const filePath = path.resolve('data', 'todos.json');

const read = async () => {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

const write = async (todos) => {
  const data = JSON.stringify(todos, null, 2);
  await fs.writeFile(filePath, data);
};

export async function getAll() {
  return await read();
}

export async function getById(todoId) {
  const todos = await read();
  const foundTodo = todos.find((todo) => todo.id === todoId);
  return foundTodo || null;
}

export async function creat(title) {
  let todos = await read();

  const newTodo = {
    id: uuidv4(),
    title,
    completed: false,
  };

  todos.push(newTodo);

  await write(todos);
  return newTodo;
}

export async function remove(todoId) {
  let todos = await read();
  todos = todos.filter((todo) => todo.id !== todoId);
  await write(todos);
}

export async function removeMany(ids) {
  let todos = await read();
  if (!ids.every(getById)) {
    throw new Error();
  }
  todos = todos.filter((todo) => !ids.includes(todo.id));
  await write(todos);
}

export async function update({ id, title, completed }) {
  let todos = await read();
  const foundTodo = todos.find((todo) => todo.id === id);

  Object.assign(foundTodo, { title, completed });
  await write(todos);
  return foundTodo;
}
