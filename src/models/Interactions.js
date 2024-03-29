const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const Interaction = new Schema({
    _id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    _id_post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    },
    action:{type:String},
    note:{type:String},
},{
    timestamps:true,
});
Interaction.plugin(mongooseDelete,{ 
    overrideMethods: 'all',
    deletedAt : true 
 });
module.exports = mongoose.model('interactions',Interaction);
