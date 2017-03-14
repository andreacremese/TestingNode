const _sut = require('./../modules/readFile.js');
const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert

chai.should();

describe('canReadFile', () => {

    // all tests are in a single handler for the time being in order to prevent calling done multiple times.
    it ('should read the file correctly and create dictionary - 3 letter words ', function (done) {

        var spy =  sinon.spy();
        _sut.on('dictionaryReady', spy);
        var letterNumber;
        // act
        _sut.emit('startParsing', './tests/testDictionary.txt');


        _sut.on('dictionaryReady', function () {
            var result = spy.args[0][0];

            letterNumber = 3;
            assert.isArray(result, 'dictionary to be an array');
            assert.property(result[letterNumber], 'eht','dictionary to have at n-th position an object with the entries organized by key (string ordered in alphabetical order)');
            assert.include(result[letterNumber]['eht'], "the", 'the entry at nth position, at the key for the word, to have the required words');
            assert.property(result[letterNumber], 'fox','dictionary to have at n-th position an object with the entries organized by key (string ordered in alphabetical order)');
            assert.include(result[letterNumber]['fox'], "fox", 'the entry at nth position, at the key for the word, to have the required words');
            assert.notProperty(result[letterNumber], 'fex','dictionary only to store words that occur');

            letterNumber = 4;
            assert.property(result[letterNumber], 'abst');
            assert.include(result[letterNumber]['abst'], 'bats');
            assert.include(result[letterNumber]['abst'], 'tabs');

            letterNumber = 6;
            assert.property(result[letterNumber], 'dejmpu');
            assert.include(result[letterNumber]['dejmpu'], 'jumped');            
            assert.include(result[letterNumber]['dejmpu'], 'pedjum');            
            assert.property(result[letterNumber], 'aadenr');
            assert.include(result[letterNumber]['aadenr'], 'andrea');
            assert.equal(result[letterNumber]['aadenr'].length, 1);
            
            letterNumber = 2;
            assert.isUndefined(result[letterNumber]);
            done();
        })
    })

    // it ('should read the file correctly and create dictionary - 4 letter words (specs)', function () {
    //     _sut.on('dictionaryReady', function () {

    //     })
    // })

    // it ('should read the file correctly and create dictionary - 6 letter words', function (done) {
    //     _sut.on('dictionaryReady', function () {

    //         done();
    //     })
    // })

    // it ('should read the file correctly and create dictionary - 6 letter words', function () {
    //     _sut.on('dictionaryReady', function () {    
         
    //     })            
    // })  
     
})