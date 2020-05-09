const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const shoeSchema = new Schema({
    username: {type: String, required: true},
    name: {type: String, required: true},
    size: {type:String, required: true},
    imgUrl: {type: String, required: true},
    urlName: {type: String, required: true},
    lastPrice: { type: Number},
    currentPrice: {type: Number},
    
},{
    timestamps: true,

});

const Shoe = mongoose.model("Shoe", shoeSchema);

module.exports = Shoe;