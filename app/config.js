var mongoose = require('mongoose');

var database = 'mongodb://127.0.0.1:27017/shortly';

if (process.env.NODE_ENV === 'production') {
   database = 'mongodb://MongoLab-x:TV00Bq0IO7nKsCuRSn9AnOsjpaXfxjeZyYrzhZ3VgCs-@ds052827.mongolab.com:52827/MongoLab-x';
}

mongoose.connect(database);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function() {
  console.log('mongo connected');
});

module.exports = db;
