const mongo = require("mongodb");
var DBService = require("./DBService");

function getById(projId) {
  projId = new mongo.ObjectID(projId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection("proj").findOne({ _id: projId }, (err, proj) => {
        // console.log('proj',proj)
        if (err) reject(err);
        else resolve(proj);
        db.close();
      });
    });
  });
}

function add(proj) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection("proj").insertOne(proj, (err, res) => {
        console.log("resresresresresres", res);
        db
          .collection("proj")
          .findOne(
            { _id: new mongo.ObjectID(res.insertedId) },
            (err, projFromDB) => {
              if (err) reject(err);
              else resolve(projFromDB);
              db.close();
            }
          );
      });
    });
  });
}

function remove(projId) {
  projId = new mongo.ObjectID(projId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection("proj").deleteOne({ _id: projId }, (err, res) => {
        if (err) reject(err);
        else resolve();
        db.close();
      });
    });
  });
}

function update(proj) {
  proj._id = new mongo.ObjectID(proj._id);
  // console.log(proj._id)
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("proj")
        .updateOne({ _id: proj._id }, proj, (err, updatedProj) => {
          if (err) reject(err);
          else resolve(updatedProj);
          db.close();
        });
    });
  });
}

function query(criteria) {
  var skip = +criteria.skip
  if(skip||skip === 0) delete criteria.skip
  else skip = 0
  console.log('criteria',criteria)
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("proj")
        .find(criteria,{title:1,desc:1,category:1,fundingGoal:1,fundsRaised:1,duration:1,featuredImgUrl:1})
        .skip(skip)
        .limit(12)
        .toArray((err, projs) => {
          if (err) reject(err);
          else resolve(projs);
          db.close();
        });
    });
  });
}

module.exports = {
  query,
  add,
  remove,
  update,
  getById
};
