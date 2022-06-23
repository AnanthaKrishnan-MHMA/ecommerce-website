const mongoose = require('mongoose');

const connectDatatbase = () => {
    mongoose.connect(process.env.DB_URI)
        .then((data) => {
            console.log(`successfully connected to server: ${data.connection.host}`);
        })
        
}


module.exports = connectDatatbase;