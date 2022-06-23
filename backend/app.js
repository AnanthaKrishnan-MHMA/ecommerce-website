const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error')
// routers
const productRouter = require('./routes/productRoute');

app.use(express.json());
app.use('/api/v1',productRouter);
// error middleware
app.use(errorMiddleware);

module.exports = app;
