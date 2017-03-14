// import statements
const readFile = require('./modules/readFile.js');
const wordUtils = require('./modules/wordUtils.js');
const readline = require('readline');
const appSettings = require('./appsettings.json');

// read from the command line for words required to be parsed
var required = [];
process.argv.forEach((val, index, array) => {
    if (index == 0 || index == 1) { return; }
    required.push(val);
});

/**
 * Creation of utility for read line, in case no input was given.
 */
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// emits the event to start parsing the input file
readFile.emit('startParsing',appSettings.dictionaryLocation);


// receives the event that the dictionary is ready, can start searching for the words
readFile.on('dictionaryReady', (dict) => {
    console.log("\n\r");

	 /**
      * Helper wrapper function to find the anagrams and print them to the console
      */
    function printResult(word){
			var res = wordUtils.find(dict, word);
			if (res.length == 0 ) {
				console.log(`Could not find anagrams for ${word}`);
			} else {
				console.log(` >>>>>> Found ${res.length} anagrams for ${word} : ${res.join(', ')} <<<<<<`);            
			}
    }

    /**
     * Input is processed in case input was given via the command line
     */
    for (var i = 0; i < required.length; i ++) {
		 printResult(required[i]);
		 rl.close();
    }

	 /***
      * In case no input was given, the user is promped to type in the words one by one.
      */
    if (required.length == 0) {
        console.log("No input .... Please specify which words you want the anagrams: node app.js [word1] [word2] ...")
        console.log("Want to find an anagram? Please enter the word you'd like the anagrams of (control + C to quit)");

        rl.on("line", (answer) => {
            printResult(answer);
            console.log("\n\r");
            console.log("Want to find an anagram? Please enter the word (control + C to quit)");
            return;
        });
    }


    console.log("\n\r");
});