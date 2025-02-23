const mongoose = require('mongoose');


const dbConnection = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');
    }catch(err){
        console.error(err);
        throw new Error('MongoDB connection error');
    }
}

module.exports = {
    dbConnection
}