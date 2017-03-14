const fs = require('fs');
const readline = require('readline');
const _ = require('lodash');
const EventEmitter = require('events')

var ee = new EventEmitter();

// module exports an event emitter, could have used a callback but like the emitter pattern.
module.exports = ee;

    var dict = [];

    /**
    * event that starts the parsing for the file
    * extracts dictionary from the file. 
    * position n has all words of n letters,
    * each entry of the object at position entry has the letters in alphabetical order
    * corrisponding to that, all words are included
    */ 
    ee.on('startParsing',  (fileName) => {
        // starts the read line stream
        const rl = readline.createInterface({
            input: fs.createReadStream(fileName)
        });
        
        // adds each line to the dictionary (see above)
        rl.on('line',  (line) => {
            // the line is tested for ONLY letters (lower / upper)
            // no numbers or other non letters are allowed. Trailing spaces are allowed and removed afterwards. No spaces allowed within the words
            var r = new RegExp(/[\s]{1,}[a-z]{1,}|[\d]+/i); 
            if (r.test(line)) { 
                console.log(`Cannot ingest \"${line}\" - does it contain a number or a space?`);
                return; 
            }
            line = line.toLowerCase();
            // remove trailing spaces if any
            var trailingSpace = line.indexOf(" ");
            if (trailingSpace != -1) {
                line = line.substring(0, trailingSpace);
            }
            
            // get position where the word should be inserted
            var position = line.length;
            // get the kay at that position
            // TODO - scope for improvement - commoditize this call
            var key = _.sortBy(line.split("")).join("");
            // is the entry for words with this length initialized
            if (typeof dict[position] != 'object') {
                dict[position] = {};
            }
            // check if the object contains a key with the current letters, if not create the array
            if (!(key in dict[position])) {
                dict[position][key] = [line];
            } else {
                if (_.includes(dict[position][key], line)){ return; }
                dict[position][key].push(line);
            }
        });


        /**
         * Emits that the file is finishe, together with the array.
         */
        rl.on('close',  () => {
            ee.emit('dictionaryReady', dict);
        })
    })