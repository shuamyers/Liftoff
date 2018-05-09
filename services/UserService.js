const mongo = require('mongodb');
const DBService = require('./DBService');

const COLLECTION_NAME = 'user';

function checkLogin (user) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(COLLECTION_NAME)
        .findOne({ email: user.email, pass: user.pass }, (
          err,
          userFromDB
        ) => {
          if (err) reject(err)
          else resolve(userFromDB);
          db.close();
        });
    });
  });
};

function addUser (user) {
  user.admin = false;
  user.createdAt = Date.now();
  user.digitalWallet = 1000;
  return new Promise((resolve, reject) => {
    const isValidate = validateDetails(user);
    if (!isValidate) reject('Validate failed!');
    DBService.dbConnect().then(db => {
      db
        .collection(COLLECTION_NAME)
        .findOne({ email: user.email }, (err, userFromDB) => {
          if (userFromDB) {
            reject('Email is already used!');
            db.close();
          } else {
            db.collection(COLLECTION_NAME).insert(user, (err, res) => {
              if (err) reject(err);
              else{
                resolve(res.ops[0]);
              } 
              db.close();
            });
          }
        });
    });
  });
};

function validateDetails(user) {
  return user.name !== 'puki';
}

module.exports = {
 checkLogin,
 addUser
}