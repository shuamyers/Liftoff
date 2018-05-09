const mongo = require('mongodb');
var DBService = require('./DBService');

function getByUserId(userId) {
	userId = new mongo.ObjectID(userId);
	return new Promise((resolve, reject) => {
		DBService.dbConnect().then(db => {
			db
				.collection('comment')
				.find({ userId })
				.toArray((err, comments) => {
					if (err) reject(err);
					else resolve(comments);
					db.close();
				});
		});
	});
}

function getByProjId(projId) {
	projId = new mongo.ObjectID(projId);
	return new Promise((resolve, reject) => {
		DBService.dbConnect().then(db => {
			db
				.collection('comment')
				.find({ projId })
				.toArray((err, comments) => {
					if (err) reject(err);
					else resolve(comments);
					db.close();
				});
		});
	});
}

function add(comment) {
	comment.projId = new mongo.ObjectID(comment.projId);
	comment.userId = new mongo.ObjectID(comment.userId);

	console.log('db service', comment);

	return new Promise((resolve, reject) => {
		DBService.dbConnect().then(db => {
			db.collection('comment').insertOne(comment, (err, res) => {
				db
					.collection('comment')
					.findOne(
						{ _id: new mongo.ObjectID(res.insertedId) },
						(err, commentFromDB) => {
							if (err) reject(err);
							else resolve(commentFromDB);
							db.close();
						}
					);
			});
		});
	});
}

function remove(commentId) {
	commentId = new mongo.ObjectID(commentId);
	return new Promise((resolve, reject) => {
		DBService.dbConnect().then(db => {
			db.collection('comment').deleteOne({ _id: commentId }, (err, res) => {
				if (err) reject(err);
				else resolve();
				db.close();
			});
		});
	});
}

function update(comment) {
	comment._id = new mongo.ObjectID(comment._id);
	return new Promise((resolve, reject) => {
		DBService.dbConnect().then(db => {
			db
				.collection('comment')
				.updateOne({ _id: comment._id }, comment, (err, updatedComment) => {
					if (err) reject(err);
					else resolve(updatedComment);
					db.close();
				});
		});
	});
}

function query() {
	return new Promise((resolve, reject) => {
		DBService.dbConnect().then(db => {
			db
				.collection('comment')
				.find({})
				.toArray((err, comments) => {
					if (err) reject(err);
					else resolve(comments);
					db.close();
				});
		});
	});
}

function remove(commentId) {
	commentId = new mongo.ObjectID(commentId);
	return new Promise((resolve, reject) => {
		DBService.dbConnect().then(db => {
			db.collection('comment').deleteOne({ _id: commentId }, (err, res) => {
				if (err) reject(err);
				else resolve();
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
	getByProjId,
	getByUserId
};
