const _sut = require('./../modules/wordUtils.js');
const chai = require('chai');
const assert = chai.assert

chai.should();

// stubs
var dict = [ ]
dict[6]= { dejmpu: [ 'jumped', 'pedjum' ], aadenr: [ 'andrea' ]  };

describe('canFindInDictionary', () => {

    it ('can find word in dictionary', () => {
        // arrange
        // act
        var result = _sut.find(dict,"andera");
        // assert
        assert.equal(result.length, 1);
        assert.include(result, 'andrea');
    })

    it ('can find word\'s anagram in dictionary' , () => {
        // arrange
        // act
        var result = _sut.find(dict,"aaendr");
        // assert
        assert.equal(result.length, 1);
        assert.include(result, 'andrea');
    })

    it ('returns empty array for entry not in dictionary' , () => {
        // arrange
        // act
        var result = _sut.find(dict,"aaendt");
        // assert
        assert.equal(result.length, 0);
    })

    it ('can find multiple results' , () => {
        // arrange
        // act
        var result = _sut.find(dict,"epdjum");
        // assert
        assert.equal(result.length, 2);
        assert.include(result, 'jumped');
        assert.include(result, 'pedjum');
    })

    it ('can find word in dictionary disregarding capitalization', () => {
        // arrange
        // act
        var result = _sut.find(dict,"aaEndr");
        // assert
        assert.equal(result.length, 1);
        assert.include(result, 'andrea');
    })

    it ('can find word in dictionary disregarding capitalization', () => {
        // arrange
        // act
        var result = _sut.find(dict,"bats");
        // assert
        assert.equal(result.length, 0);
    })
}); 