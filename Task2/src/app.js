const express = require('express');
const app = express();
const port = 3000;
const router = require('./routers/userRouter');
const middleware = require('./middlewares/middlewares');

app.use(express.json());
app.use('/users', router);

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.use(middleware.logErrors);
app.listen(port);
