# Problem
You are given a dictionary file, with one word per line. 
Write a program that takes as input one or more words, and for each input word, print out all anagrams of the input word that appear in the dictionary. 
An anagram of a word is any word you can form by permuting the letters of the input word. 
For example, the word "stab" is an anagram of "bats", as is "tabs". 
Please include documentation for running your program. Try to make it easy-to-use and efficiently implemented.
 
# How to run
## Setup
Please ensure Node, npm and git are installed globally on the machine you will be running this code sample. Node version used is `6.2.2`, if you have [avn](https://www.npmjs.com/package/avn) installed the .node-version file is included.

Clone the repo and cd in to it, then install the packages via npm (only production is needed to run the app, the dev dependencies are needed for the tests):
```
git clone https://github.com/andreacremese/Challenge2.git
cd Challenge2
npm install --production
```
The dictionary is in a file called `./dictionary.txt`. The location of the dictionary file is specified in `appsettings.json`;

## Use
To pass in strings straight from the command line:

```
npm start [string to search in dictionary]
```
For example `npm start rats` will give out the anagrams of rats, and then exits. To instead run the process and keep feeding strings in from the command line just type

```
npm start
```

## Tests
Please ensure that gulp is installed globally (with `-g`) on your machine.
Install the dev dependencies. 
The tests are in mocha, they are through gulp. To run the tests once:

```
npm install
gulp mocha // or npm test
```

In order to run the tests on a watch (mainly for development), run the default `gulp` task. Test have several assertions baked in.

## As a server
As a quick integration, the service required is as well implemented as a server. Start it with:

```
node server.js
```

And hit `http://localhost:3000/anagrams?word=rats`. The query string contains the word required. 
Does not support multiple words (yet).

The master branch is deployed to Azure in a quick App Service connected to the master branch of this repository - continuous deployment. Navigate to `challenge2.azurewebsites.net/anagrams?word=rats`;



# Overview of the app
## Algorithm
The idea for the app's algorithm is to parse the full input text file and create a data structure that allows constant time search when a word is passed in for search.

It has been assumed that, in the input file, words with spaces within are not legitmate. Meaning `hitch hiker` is discarded. Trailing spaces are allowed, and they are removed during the parsing, meaning `bats   ` is parsed as `bats`. Duplicate words are counted only once. Refer to the tests and the `testDictionary.txt`.

All words in the input file are stored in the dictionary according to their length. The dictionary is an array (!). The n-th element of the array will contain all the words what are n-letters long.

Each position of the dictonary array is an object where the keys/properties are the letters of the words encountered, lowercased and ordered alphabetically. The value for this is an array of the words. For example, if the input file contained only *rats* and *arts*, the dictionary will be:

```
[
    ,
    ,
    ,{
        arst : ['rats', 'arts']
    }
]
// note that the entry is at the 3rd position of the array, words lowercased and ordered in alphabetical order.
```

If the word *cart* was included as well, the dictionary would become:
```
[
    ,
    ,
    ,{
        arst : ['rats', 'arts'],
        acrt : ['cart']
    }
]
// note the separate keys / properties on the object at location 3.
```

Note that duplicate entries will be escaped during parsing.

## Performance commentary

The structure above may seem memory intensive, as a full array is created in memory to store the words. Javascript does not allocate a contiguous slab of memory for an array, alleviating the issue that would ensue if this was done in another language.

Nonetheless, this offers constant time for the search, which is my take for the 'efficently implemented' in the request. When a word is searched, its letters are counted, lowercased and ordered alphabetically. The anagrams for that word will be at the nth location of the dictionary (n is the number of letters) and, within that object, they will be at the key/property equal to the letters lowercased and ordered.

## Implementation
The creation of the dictionary array (see above for info) is done in the `readFile` module. This module returns an event emitter, in order to make sure that the parsing can be started from the main app, and mostly to make sure that the requests are processed only after the parsing of the file is fully completed.

The search for the word(s) is performed in the `wordUtil` module. The API for this module is similar to lodash, meaning it does not encapsulate any state. The dictionary is passed in with the request, with the library containing only the business logic for the search.

The main entry point is the `app.js`, where the input is read and, in case no input is given, an option is provided for the user to type in words. The main entry point for the server version is `server.js`.

Tests are provided for the `readFile` module and the `wordUtil` module.

## Scope or improvement
Add warning in case the searched word is not in the dictionary

Require node version > 6 may be a blocker