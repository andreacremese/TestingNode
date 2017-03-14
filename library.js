module.exports = library();


function library(){

    function isEven(n) {
        return n % 2 === 0;
    }

    return {
        isEven : isEven
    }
}