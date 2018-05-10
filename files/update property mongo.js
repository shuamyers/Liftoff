db.getCollection('proj').find({}).forEach(function(doc) {
    var random = (Math.random()*30).toFixed(0);
    db.getCollection('proj').update(
        {"_id": doc._id}, 
        { "$set": { "duration": random } }
    );
});