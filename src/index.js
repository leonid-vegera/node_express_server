'use strict';

import express from 'express';
import cors from 'cors';
import { router as todosRouter } from './routes/todos.js';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.use('/todos', express.json(), todosRouter);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
