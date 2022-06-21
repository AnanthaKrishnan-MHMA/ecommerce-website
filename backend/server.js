const app = require('./app');
const dotenv = require('dotenv');
// config
dotenv.config({path:'./config/config.env'});
// enviornment variables
const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
});
