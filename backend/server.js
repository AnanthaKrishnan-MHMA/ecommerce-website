const app = require('./app');
const dotenv = require('dotenv');
const connectDatatbase = require('./config/database');

// uncaught reference error handler
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('shutting down server due to uncaught exception');
    process.exit(1);
})
// config
dotenv.config({path:'./config/config.env'});
//import enviornment variables
const port = process.env.PORT;
// database connection with mongoose
connectDatatbase();


const server = app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
});

// handling unhandled promise rejection
process.on('unhandledRejection',(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`shutting down due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    });
});