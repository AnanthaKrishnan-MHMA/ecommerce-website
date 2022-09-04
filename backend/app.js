const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error')
// routers
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute');
const orderRouter = require('./routes/orderRoute');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());
// app.use(function(req,res,next){setTimeout(next,2000)});//simulating higher latency // remove before publishing
app.use(cors());
app.use('/api/v1',productRouter);
app.use('/api/v1',userRouter);
app.use('/api/v1',orderRouter);
// error middleware
app.use(errorMiddleware);

module.exports = app;
