const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const ingredientSchema = new Schema({
    name: { type: String },
    img_url: { type: String },
    quantity: { type: String },
});

const reviewSchema = new Schema({
    star: { type: String },
    _id_user: { type: Schema.Types.ObjectId },
    comment: { type: String },
});
const Recipes = new Schema({
    _id_topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topics'
    },
    name_food: { type: String },
    title: { type: String },
    img_url: { type: String },
    video_url: { type: String },
    time: { type: String },
    ingredient: [ingredientSchema],
    evaluate: [reviewSchema],
}, {
    timestamps: true,
});
Recipes.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
});
module.exports = mongoose.model('recipes', Recipes);