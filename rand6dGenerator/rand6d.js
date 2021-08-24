const mongoose = require('mongoose');

const dbURI = "mongodb+srv://YourUsername:YourPassword@YourClusterName.bnvaq.mongodb.net/YourDatabaseNamr?retryWrites=true&w=majority" // Your MongoDB Connection String

const ShortURL = require("../model/shorturl");

const getRand6d = async () => {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    var flag = true;
    var usedRand6dDb = ; // some database fetch

    const usedRand6d = usedRand6dDb.map((obj) => obj.rand6d)

    while(flag){
        const length = 6;
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        if(!(usedRand6d.includes(result))){
            flag=false;
            return result;
        }
}};

module.exports.get6d = getRand6d;
