const app = require('./app');
const dotenv = require('dotenv');
const connectDatatbase = require('./config/database');

// config
dotenv.config({path:'./config/config.env'});
//import enviornment variables
const port = process.env.PORT;
// database connection with mongoose
connectDatatbase();


app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
});
