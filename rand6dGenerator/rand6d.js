const mongoose = require('mongoose');

const dbURI = "mongodb+srv://testinguser:pass123@gameboycluster.bnvaq.mongodb.net/justtesting?retryWrites=true&w=majority"


const ShortURL = require("../model/shorturl");

const getRand6d = async () => {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    var flag = true;
    var usedRand6dDb = await ShortURL.find({})

    const usedRand6d = usedRand6dDb.map((obj) => obj.rand6d)
    console.log(usedRand6d);

    while(flag){
        const length = 6;
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        if(!(result in usedRand6d)){
            flag=false;
            return result;
        }
}};

module.exports.get6d = getRand6d;

