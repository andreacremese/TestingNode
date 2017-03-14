const express = require('express');
const readFile = require('./modules/readFile.js');
const wordUtils = require('./modules/wordUtils.js');
const appSettings = require('./appsettings.json');
var app = express();

// emits the event to start parsing the input file
readFile.emit('startParsing',appSettings.dictionaryLocation);

readFile.on('dictionaryReady', (dict) => {

    // use query params api/anagrams?word=andrea
    app.get('/anagrams', function (req, res) {

        var anagrams = wordUtils.find(dict,req.query.word);
        var message;
        if (anagrams.length == 0 ) {
            message = `Could not find anagrams for ${req.query.word}`;
        } else {
            message = `Found ${anagrams.length} anagrams for ${req.query.word} : ${anagrams.join(', ')}`;            
        }
        res.status(200).send(message);
    });

    var port = process.env.PORT || 3000;
    app.listen(port);
    console.log(`app starting listening at port ${port}`)
});

app.get('/api/test', function (req, res) {
    res.status(200).send("ok");
})