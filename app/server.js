const getPolls = require('./dbactions').getPolls;
const insertPoll = require('./dbactions').insertPoll;
const removePoll = require('./dbactions').removePoll;
const connectToDb = require('./dbactions').connectToDb;
const multer = require('multer');
const path = require('path');
const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 8080));

//app.use(express.static(path.join(__dirname  + '/views')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname  + '/views'));


// render poll creation form
app.get('/newpoll', (req, res) => {
    console.log(__dirname);
    res.render('createpoll');
});

// create new poll
app.post('/createpoll', multer().array(), (req, res) => {
    //insertPoll();
    const postParams = req.body;
    const paramsAmount = Object.keys(postParams).length;
    const name = postParams.name;
    let options = [];

    for(let i = 1; i < paramsAmount; i++) {
        options.push(postParams['option' + i]);
    }

    insertPoll(name, options, 'TatuPutto')
        .then(() => res.end('Poll created succesfully'))
        .catch((err) => res.end('Could not create poll' + err));
});

// get polls
app.get('/polls', (req, res) => {
    getPolls('TatuPutto')
        .then((data) => res.end(JSON.stringify(data)))
        .catch((err) => res.end(err));
});

app.get('/removepoll', (req, res) => {
    removePoll();
});

app.listen(app.get('port'), () => console.log('Listening port ' + app.get('port')));
