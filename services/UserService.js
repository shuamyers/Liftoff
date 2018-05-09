const mongo = require('mongodb');
const DBService = require('./DBService');

const COLLECTION_NAME = 'user';

function checkLogin(user) {
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
}

function addUser (user) {
  user = (createNewUser(user));
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

function createNewUser(user) {
  return {
    name: user.name,
    email: user.email,
    pass: user.pass,
    isAdmin: false,
    createdAt: Date.now(),
    imgUrl: 'http://www.avglobalservices.in/img/testimonial/02.jpg',
    digitalWallet: 1000,
    favourites: []
  }
}
function updateWallet(user) {
  return new Promise((resolve, reject) => {
    // let isValidate = validateDetails(user);
    // if (!isValidate) reject('Validate failed!');
    user._id = new mongo.ObjectID(user._id);
    DBService.dbConnect().then(db => {
      db.collection("user").updateOne(
        { _id: user._id },
        {
          $inc: {
            digitalWallet: user.diff
          }
        },
        (err, updatedInfo) => {
          if (err) reject(err);
          else{
            db.collection("user").findOne({ _id: user._id }, (err, updatedUserFromDB) => {
              // console.log('updated user!',updatedUserFromDB)
              resolve(updatedUserFromDB);
            })
          }
          db.close();
        }
      );
    });
  });
}

function validateDetails(user) {
  return user.name !== 'puki';
}

module.exports = {
 checkLogin,
 addUser,
 updateWallet
}
