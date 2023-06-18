const user = require('./user');
const topic = require('./topic');
const storage = require('./storages');
const recipes = require('./recipes');
const post = require('./post');
const interactions = require('./interactions');
const blankTest = require('../middlewares/blankTest');

function route(app) {
    app.use('/users',blankTest,user);
    app.use('/topics',topic);
    app.use('/storages',storage);
    app.use('/recipes',recipes);
    app.use('/posts',post);
    app.use('/interactions',interactions);
}


module.exports = route;