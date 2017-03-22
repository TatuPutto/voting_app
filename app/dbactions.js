const mongo = require('mongodb').MongoClient;


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
                    reject('You don\'t have any active polls');
                }
                db.close();
            });
        });
    });
}


// insert new poll into db
function insertPoll(name, options, author) {
    let poll = {name, author};

    for(let i = 0; i < options.length; i++) {
        poll['option' + i] = options[i];
    }

    return new Promise((resolve, reject) => {
        getConnection((err, db, collection) => {
            if(err) return reject(err);

            collection.insert({poll}, (err) => {
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

// answer to specific poll
function addAnswer() {

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
module.exports.insertPoll = insertPoll;
module.exports.removePoll = removePoll;
