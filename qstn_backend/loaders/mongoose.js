const mongoose= require("mongoose");
const { DB, PORT } = require("../config");
module.exports = async () => {
    const connection = mongoose.connection;
    console.log(DB);
    mongoose.connect(DB, {
        'useNewUrlParser': true,
        'useUnifiedTopology': true
    });

    connection.on('error', console.error.bind(console, 'connection error:'));
    connection.once('open', function () {
        console.info("Connected to MongoDB.");
    });

    return connection.db;
};