const mongo = require('mongodb');
var DBService = require('./DBService');

module.exports.checkLogin = user => {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection('user')
        .findOne({ name: user.name, password: user.password }, function(
          err,
          userFromDB
        ) {
          if (err) reject(err)
          else resolve(userFromDB)
          db.close();
        });
    });
  });
};

function validateDetails(user) {
  console.log(user);
  return user.name !== 'puki';
}

module.exports.addUser = user => {
  return new Promise((resolve, reject) => {
    let isValidate = validateDetails(user);
    if (!isValidate) reject('Validate failed!');
    DBService.dbConnect().then(db => {
      db
        .collection('user')
        .findOne({ name: user.name }, function(err, userFromDB) {
          // If name is already used!
          if (userFromDB) {
            console.log('Name is already used!');
            reject('Name is already used!');
            db.close();
          } else {
            db.collection('user').insert(user, (err, res) => {
              if (err) reject(err);
              else resolve(res.ops);
              db.close();
            });
          }
          
        });
    });
  });
};
