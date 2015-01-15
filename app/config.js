var Bookshelf = require('bookshelf');
var path = require('path');
var host = process.env.HOST || '127.0.0.1';
if (process.NODE_ENV === "production"){
  var database = "shortlydb";
  var filename = path.join(__dirname, '../db/'+database+'.sqlite')
} else {
  var database = "shortlydevdb";
  var filename = path.join(__dirname, '../db/'+database+'.sqlite')
}

var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    host: host,
    user: 'your_database_user',
    password: 'password',
    database: database,
    charset: 'utf8',
    filename: filename
  }
});

db.knex.schema.hasTable('urls').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('urls', function (link) {
      link.increments('id').primary();
      link.string('url', 255);
      link.string('base_url', 255);
      link.string('code', 100);
      link.string('title', 255);
      link.integer('visits');
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
