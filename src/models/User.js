const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const savesRecipes = new Schema({
    _id_recipes:{type:Schema.Types.ObjectId}
});

const User = new Schema({
    phone_number:{type:String},
    email:{type:String},
    name:{type:String},
    date:{type:String},
    pass:{type:String},
    avatar:{type:String},
    address:{type:String},
    story:{type:String},
    saveRecipes:[savesRecipes]
},{
    timestamps:true,
});
User.plugin(mongooseDelete,{ 
    overrideMethods: 'all',
    deletedAt : true 
 });
module.exports = mongoose.model('users',User);

