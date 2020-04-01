const SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const app = express();
const userRouter = require('./api/routers/userRouter');
const middleware = require('./api/middlewares/middlewares');
const winston = require('./config/logger');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (error) =>   winston.logger.error(error));
db.once('open', () =>   winston.logger.info('Connected to db'));

app.use(express.json());
app.use(cors());

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

const config = {
    appRoot: __dirname // required config
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
    if (err) {
        throw err;
    }

    swaggerExpress.register(app);

    app.listen(process.env.PORT);
});
