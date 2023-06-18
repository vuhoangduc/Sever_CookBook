const mongoose = require('mongoose');

// 'mongodb://localhost:27017/ASM_ReactNative
// mongodb+srv://ttgvhd:vuhoangduc1050@cluster0.kv2vhnu.mongodb.net/Cook_Book?retryWrites=true&w=majority
 function connect() {
    mongoose.connect('mongodb://localhost:27017/Sever_cook_book', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => console.log('Connected to MongoDB local'))
      .catch(error => console.error(error));
}

module.exports = {connect};