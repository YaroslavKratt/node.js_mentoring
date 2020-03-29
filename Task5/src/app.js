import express from 'express';
import groupRouter from './routers/groupRouter';
import middlewares from './middlewares/middlewares';
const app = express();
require('dotenv').config();

app.use(express.json());
app.use('/groups', groupRouter);
app.use(middlewares.handleError);

app.listen(process.env.PORT);
