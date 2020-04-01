const express = require('express');
const app = express();
const homeRouter = require('./routers/homeRouter');
const userRouter = require('./routers/userRouter');
const middleware = require('./middlewares/middlewares');
const winston = require('./logger');
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use('/', homeRouter);
app.use('/users', userRouter);

app.use(middleware.handleError);
process.on('uncaughtException',  (err) => {
    winston.logger.error(`Fatal error, please check logs and restart aplication
      ${err.stack}`);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    winston.logger.warn(`Unhandled promise rejection was caught with reason "${reason}"`);
});

app.listen(process.env.PORT);
