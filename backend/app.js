const express = require('express');
const app = express();
// routers
const productRouter = require('./routes/productRoute');

app.use(express.json());
app.use('/api/v1',productRouter);

module.exports = app;
