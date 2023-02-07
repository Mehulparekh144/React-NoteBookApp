
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const mongoURI = "mongodb://localhost:27017/noteBookDB"

const connectToMongo = async () =>{
    mongoose.connect(mongoURI , () =>{
        console.log('Connected to MongoDB :)');
    });

}

module.exports = connectToMongo;