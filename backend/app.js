const express = require('express');
const app = express();
// routers
const homeRouter = require('./routes/homeRoute');
app.use(express.json());
app.use('/home',homeRouter);

module.exports = app;
