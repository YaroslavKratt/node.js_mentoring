const express = require('express');
const app = express();
const port = 3000;
const router = require('./routers/userRouter');
const middleware = require('./middlewares/middlewares');
const winston = require('./logger');

app.use(express.json());

app.use('/users', router);
app.use(middleware.handleError);

process.on('uncaughtException',  (err) => {
    winston.logger.error(`Fatal error, please check logs and restart aplication
      ${err.stack}`);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    winston.logger.warn(`Unhandled promise rejection was caught with reason "${reason}"`);
});

app.listen(port);
