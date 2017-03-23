const getPolls = require('./dbactions').getPolls;
const getPollById = require('./dbactions').getPollById;
const insertPoll = require('./dbactions').insertPoll;
const removePoll = require('./dbactions').removePoll;
const insertVote = require('./dbactions').insertVote;
const multer = require('multer');
const path = require('path');
const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 8080));

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname));

//app.use(express.static(path.join(__dirname  + '/views')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname  + '/views'));


// render poll creation form
app.get('/newpoll', (req, res) => {
    res.render('createpoll');
});

// create new poll
app.post('/createpoll', multer().array(), (req, res) => {
    const postParams = req.body;
    const paramsAmount = Object.keys(postParams).length;
    const name = postParams.name;
    let options = [];

    for(let i = 1; i < paramsAmount; i++) {
        let option = {};
        option['option_id'] = i.toString();
        option['value'] = postParams['option' + i];
        option['votes'] = 0;
        options.push(option);
    }

    insertPoll(name, options, 'TatuPutto')
        .then(() => res.redirect('/polls'))
        .catch((err) => res.end('Could not create poll' + err));
});



// get polls
app.get('/polls', (req, res) => {
    getPolls('TatuPutto')
        .then((polls) => {
            res.render('polls', {polls});
        })
        .catch((err) => res.end(err));
});


// show poll
app.get('/poll/:id', (req, res) => {
    getPollById(req.params.id)
        .then((poll) => {
            res.render('singlepoll', {
                id: poll._id,
                name: poll.name,
                author: poll.author,
                options: poll.options,
                totalVotes: poll.totalVotes
            });
        })
        .catch((err) => res.end(err));
});


// leave a vote
app.post('/poll/:id/vote', multer().array(), (req, res) => {
    const pollId = req.params.id;
    const vote = req.body.vote;
    insertVote(pollId, vote);

    res.redirect('/poll/' + pollId);

    /*insertVote(name, options)
        .then(() => res.end('Poll created succesfully'))
        .catch((err) => res.end('Could not create poll' + err));*/
});

app.get('/removepoll', (req, res) => {
    removePoll();
});

app.listen(app.get('port'), () => console.log('Listening port ' + app.get('port')));
