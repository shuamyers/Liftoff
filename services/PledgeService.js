const mongo = require('mongodb');
var DBService = require('./DBService');

function getByUserId(userId) {
	userId = new mongo.ObjectID(userId);
	return new Promise((resolve, reject) => {
		DBService.dbConnect().then(db => {
			db
				.collection('pledge')
				.find({ userId })
				.toArray((err, pledges) => {
					if (err) reject(err);
					else resolve(pledges);
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
				.collection('pledge')
				.find({ projId })
				.toArray((err, pledges) => {
					if (err) reject(err);
					else resolve(pledges);
					db.close();
				});
		});
	});
}

function add(pledge) {
	pledge.projId = new mongo.ObjectID(pledge.projId);
	pledge.userId = new mongo.ObjectID(pledge.userId);
	pledge.rewardsId = new mongo.ObjectID(pledge.rewardsId);

	console.log('db servise', pledge);

	return new Promise((resolve, reject) => {
		DBService.dbConnect().then(db => {
			db.collection('pledge').insertOne(pledge, (err, res) => {
				db
					.collection('pledge')
					.findOne(
						{ _id: new mongo.ObjectID(res.insertedId) },
						(err, pledgeFromDB) => {
							if (err) reject(err);
							else resolve(pledgeFromDB);
							db.close();
						}
					);
			});
		});
	});
}

function remove(pledgeId) {
	pledgeId = new mongo.ObjectID(pledgeId);
	return new Promise((resolve, reject) => {
		DBService.dbConnect().then(db => {
			db.collection('pledge').deleteOne({ _id: pledgeId }, (err, res) => {
				if (err) reject(err);
				else resolve();
				db.close();
			});
		});
	});
}

function update(pledge) {
	pledge._id = new mongo.ObjectID(pledge._id);
	return new Promise((resolve, reject) => {
		DBService.dbConnect().then(db => {
			db
				.collection('pledge')
				.updateOne({ _id: pledge._id }, pledge, (err, updatedPledge) => {
					if (err) reject(err);
					else resolve(updatedPledge);
					db.close();
				});
		});
	});
}

function query() {
	return new Promise((resolve, reject) => {
		DBService.dbConnect().then(db => {
			db
				.collection('pledge')
				.find({})
				.toArray((err, pledges) => {
					if (err) reject(err);
					else resolve(pledges);
					db.close();
				});
		});
	});
}

function remove(pledgeId) {
	pledgeId = new mongo.ObjectID(pledgeId);
	return new Promise((resolve, reject) => {
		DBService.dbConnect().then(db => {
			db.collection('pledge').deleteOne({ _id: pledgeId }, (err, res) => {
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
