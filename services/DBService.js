// var DB_URL = "mongodb://Admin:Admin@ds261929.mlab.com:61929/chat_app";
var DB_URL = 'mongodb://localhost:27017/my_db';

const mongo = require("mongodb");

var MongoClient = mongo.MongoClient;

function dbConnect() {
  var prmConnect = new Promise((resolve, reject) => {
    MongoClient.connect(DB_URL, function(err, db) {
      if (err) reject(err);
      else {
        resolve(db);
      }
    });
  });
  prmConnect.catch(err => console.error("Cannot Connect!", err));
  return prmConnect;
}

module.exports = {
  dbConnect
};
