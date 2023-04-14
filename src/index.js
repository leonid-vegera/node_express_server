'use strict';

import express from 'express';
import cors from 'cors';
// import { todos } from "./todos.js";
import { v4 as uuidv4 } from 'uuid';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

export let todos = [
    { id: '1', title: 'HTML', completed: true },
    { id: '2', title: 'CSS', completed: false },
    { id: '3', title: 'React', completed: false }
];

app.patch('/todos', express.json(), (req, res) => {
    const { action } = req.query;

    if (action === 'delete') {
        const { ids } = req.body;

        if (!Array.isArray(ids)) {
            res.sendStatus(422);
            return;
        }
        const filteredTodos = todos.filter(todo => !ids.includes(todo.id));

        todos = filteredTodos;
        res.sendStatus(204);
        return;
    }

    if (action === 'update') {
        const { items } = req.body;

        if (!Array.isArray(items)) {
            res.sendStatus(422);
            return;
        }

        for (const { id, title, completed } of items) {
            const foundTodo = todos.find(todo => todo.id === id);
            if (!foundTodo) {
                continue;
            }
            Object.assign(foundTodo, { title, completed });
        }

        res.sendStatus(200);
        return;
    }
    res.sendStatus(400);
});

app.get('/todos', (req, res) => {
    res.send(todos);
});

app.get('/todos/:todoId', (req, res) => {
    const { todoId } = req.params;
    const foundTodo = todos.find((todo) => todo.id === todoId);
    if (!foundTodo) {
        res.sendStatus(404);
        return;
    }
    res.send(foundTodo);
});

app.post('/todos', express.json(), (req, res) => {
    const { title } = req.body;

    if (!title) {
        res.sendStatus(422);
        return;
    }

    const newTodo = {
        id: uuidv4(),
        title,
        completed: false
    };

    todos.push(newTodo);

    res.statusCode = 201;
    res.send(newTodo);
});

app.delete('/todos/:todoId', (req, res) => {
    const { todoId } = req.params;
    const filteredTodos = todos.filter(todo => todo.id !== todoId);

    if (filteredTodos.length === todos.length) {
        res.sendStatus(404);
        return;
    }

    todos = filteredTodos;
    res.sendStatus(204);
});

app.put('/todos/:todoId', express.json(), (req, res) => {
    const { todoId } = req.params;
    const foundTodo = todos.find(todo => todo.id === todoId);

    if (!foundTodo) {
        res.sendStatus(404);
        return;
    }

    const { title, completed } = req.body;

    if (typeof title !== 'string' || typeof completed !== 'boolean') {
        res.sendStatus(422);
        return;
    }
    Object.assign(foundTodo, { title, completed });
    res.send(foundTodo);
});

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});
