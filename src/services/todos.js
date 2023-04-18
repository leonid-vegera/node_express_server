'use strict';

import { v4 as uuidv4 } from 'uuid';
import { client } from '../utils/db.js';

export async function getAll() {
  const result = await client.query(`
    SELECT *
    FROM todos
    ORDER BY created_at
  `);

  return result.rows;
}

export async function getById(todoId) {
  const result = await client.query(
    `
    SELECT *
    FROM todos
    WHERE id = $1;
  `,
    [todoId]
  );

  return result.rows[0] || null;
}

export async function creat(title) {
  const id = uuidv4();
  await client.query(
    `
    INSERT INTO todos (id, title)
    VALUES ($1, $2)
  `,
    [id, title]
  );

  const newTodo = await getById(id);
  return newTodo;
}

export async function remove(todoId) {
  await client.query(
    `
    DELETE FROM todos
    WHERE id=$1
  `,
    [todoId]
  );
}

export async function update({ id, title, completed }) {
  await client.query(
    `
    UPDATE todos
    SET title=$2, completed=$3
    WHERE id=$1
  `,
    [id, title, completed]
  );
}

export async function removeMany(ids) {
  let todos = await read();
  if (!ids.every(getById)) {
    throw new Error();
  }
  todos = todos.filter((todo) => !ids.includes(todo.id));
  await write(todos);
}
