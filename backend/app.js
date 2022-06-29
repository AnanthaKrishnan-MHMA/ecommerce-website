const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error')
// routers
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute');

app.use(express.json());
app.use('/api/v1',productRouter);
app.use('/api/v1',userRouter);
// error middleware
app.use(errorMiddleware);

module.exports = app;
