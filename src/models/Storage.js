const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const Storage = new Schema({
    _id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    _id_reference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipes'
    },
    type:{type:String},
},{
    timestamps:true,
});
Storage.plugin(mongooseDelete,{ 
    overrideMethods: 'all',
    deletedAt : true 
 });
module.exports = mongoose.model('storages', Storage);