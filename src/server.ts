import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';

import './database';

const server = express();

server.use(cors());
server.use(express.json());

server.listen(3333);
