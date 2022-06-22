const mongoose = require('mongoose');

const connectDatatbase = () => {
    mongoose.connect(process.env.DB_URI)
        .then((data) => {
            console.log(`successfully connected to server: ${data.connection.host}:${data.connection.port}`);
        })
        .catch((err) => {
            console.log(err.message);
        });
    mongoose.connection.on('error', err => {
        console.log(err);
    });
}


module.exports = connectDatatbase;