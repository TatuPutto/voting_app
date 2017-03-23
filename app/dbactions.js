const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

// connect to database
function getConnection(callback) {
    mongo.connect('mongodb://localhost:27017/polls', (err, db) => {
        if(err) {
            return callback(err);
        }
        const polls = db.collection('polls');
        return callback(null, db, polls);
    });
}


// get polls from db
function getPolls(author) {
    return new Promise((resolve, reject) => {
        getConnection((err, db, collection) => {
            if(err) return reject(err);

            collection.find({}).toArray((err, results) => {
                if(err) reject(err);
                if(results.length > 0) {
                    resolve(results);
                } else {
                    reject('You don\'t have any active polls.');
                }
                db.close();
            });
        });
    });
}

// get poll by id
function getPollById(id) {
    return new Promise((resolve, reject) => {
        getConnection((err, db, collection) => {
            if(err) return reject(err);

            collection.find({_id: new ObjectId(id)})
                .toArray((err, results) => {
                    if(err) reject(err);
                    if(results.length > 0) {
                        resolve(results[0]);
                    } else {
                        reject('Couldn\'t find poll with this id.');
                    }
                    db.close();
                });
        });
    });
}



// insert new poll into db
function insertPoll(name, options, author) {
    return new Promise((resolve, reject) => {
        getConnection((err, db, collection) => {
            if(err) return reject(err);

            collection.insert({
                name,
                options,
                //votes: [],
                totalVotes: 0,
                author
            }, (err) => {
                if(err) return reject(err);
                resolve();
                db.close();
            });
        });
    });
}

// insert new option to existing poll
function addOption() {

}

//$inc: {totalVotes: 1, },
//$push: {votes: {option_id: vote}}

// add vote to poll
function insertVote(pollId, optionId) {
    getConnection((err, db, collection) => {
        if(err) throw err;

        collection.update({
            _id: new ObjectId(pollId),
            'options.option_id': optionId
        }, {
            $inc: {'options.$.votes': 1}
        });

        /*collection.update({
            _id: new ObjectId(pollId)
        }, {
            $inc: {totalVotes: 1},
            $push: {votes: {option_id: vote}}
        });*/
    });
}

function removePoll(id) {
    mongo.connect('mongodb://localhost:27017/polls', (err, db) => {
        if(err) throw err;
        var collection = db.collection('polls');

        collection.remove({_id: "58d2e1d4ce3e003da0d8e4a7"}, (err, data) => {
            if(err) throw err;
            db.close();
        });
    })
}


module.exports.getPolls = getPolls;
module.exports.getPollById = getPollById;
module.exports.insertPoll = insertPoll;
module.exports.insertVote = insertVote;
module.exports.removePoll = removePoll;
