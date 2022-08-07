const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error')
// routers
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute');
const orderRouter = require('./routes/orderRoute');

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1',productRouter);
app.use('/api/v1',userRouter);
app.use('/api/v1',orderRouter);
// error middleware
app.use(errorMiddleware);

module.exports = app;
