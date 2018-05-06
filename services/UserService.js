const mongo = require('mongodb');
var DBService = require('./DBService');

function checkLogin (user) {
  return new Promise((resolve, reject) => {
    console.log('check login user!',user)
    DBService.dbConnect().then(db => {
      db
        .collection('user')
        .findOne({ email: user.email, pass: user.pass }, (
          err,
          userFromDB
        ) => {
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

function addUser (user ) {
  return new Promise((resolve, reject) => {
    let isValidate = validateDetails(user);
    if (!isValidate) reject('Validate failed!');
    DBService.dbConnect().then(db => {
      db
        .collection('user')
        .findOne({ name: user.email }, (err, userFromDB) => {
          // If name is already used!
          if (userFromDB) {
            console.log('Email is already used!');
            reject('Email is already used!');
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

module.exports = {
 checkLogin,
 addUser
}



