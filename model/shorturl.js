const mongoose = require('mongoose');
const { Schema } = mongoose;

const shorturlSchema = new Schema({
    _id: {
        type:String,
    },
    actualUrl:{
            type:String,
            required:true,
        },
    rand6d:{
        type:String,
        required:true
    }
}); // schema structure

const ShortURL = mongoose.model("development",shorturlSchema);

module.exports = ShortURL;
