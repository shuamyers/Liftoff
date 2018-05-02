const mongo = require("mongodb");
var DBService = require("./DBService");

function query(criteria) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("project")
        .find({})
        .toArray((err, project) => {
          if (err) reject(err);
          else resolve(project);
          db.close();
        });
    });
  });
}

function getById(projId) {
  projId = new mongo.ObjectID(projId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection("project").findOne({ _id: projId }, (err, proj) => {
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
      db.collection("project").insertOne(proj, (err, res) => {
        console.log("resresresresresres", res);
        db
          .collection("project")
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
      db.collection("project").deleteOne({ _id: projId }, (err, res) => {
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
        .collection("project")
        .updateOne({ _id: proj._id }, proj, (err, updatedProj) => {
          if (err) reject(err);
          else resolve(updatedProj);
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
