const _ = require('lodash');

// exports a utility similar to underscore: the methods are stateless, pass in the dictionary and the word required and it finds the anagrams 
module.exports = wordUtil();

function wordUtil() {

    /**
     * find word in the dictionary
     * dictionary is expected to be an array of object
     * nth element of the dictionary to contain all words that are n letters long
     * the object at nth position has multiple keys. Each key is the alphabetical ordered string, the value is the array of all words
     * 
     * returns array of anagrams
     */
    function find(dict, word){
        var length = word.length;
        // there may not be words with that length
        if (!(dict[length])) { return [];}
        var key = _.sortBy(word.toLowerCase().split("")).join("");
        // there may not be that key for that length 
        if (!(key in dict[length])) { return [] };
        return _.filter(dict[length][key], (e) => {return e != word});
    }

    // Module's api
    return {
        find: find
    };
}