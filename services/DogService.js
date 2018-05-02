const mongo = require('mongodb');
var DBService = require('./DBService');


function query(userId) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection('dog').find({ userId }).toArray((err, dogs) => {
          if (err) reject(err)
          else resolve(dogs)
          db.close();
        });
    });
  });
}

function add(dog) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection('dog').insertOne(dog, (err, res) => {
        console.log('resresresresresres', res);
        db.collection('dog').findOne({_id: new mongo.ObjectID(res.insertedId)}, (err, dogFromDB)=>{
          if (err) reject(err)
          else resolve(dogFromDB)
          db.close();
        })
      });
    });
  });
}

module.exports = {
  query,
  add
}