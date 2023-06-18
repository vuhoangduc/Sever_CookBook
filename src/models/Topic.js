const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Topic = new Schema({
    name :{type:String},
    img:{type:String},
},{
    timestamps:true,
});

module.exports = mongoose.model('topics',Topic);