const allCodes = require('../spec/fixtures');

function transPostcode(barcode) {
    if (!isCorrectType(barcode)) {
        return `条码类型不正确`
    }
    const numbers = buildNumbers(barcode, allCodes);
    const postcode = buildPostcode(numbers);
    return postcode;
}
function isCorrectType(barcode) {
    const testStr = /^|[:,|]|$/;
    return testStr.test(barcode);
}
function buildNumbers(barcode, allCodes) {
    const numbersCode = barcode.slice(1, -1);
    const numbers = [];
    const length = 5;
    for (let i = 0; i < numbersCode.length; i++) {
        numbers.push(numbersCode.substr(i, length));
        i += 4;
    }
    return numbers.map(number => allCodes.find(code => code.code === number).digit)
}
function buildPostcode(numbers) {
    const checkCode = numbers.pop();
    return check(checkCode, numbers) ? numbers.join('') : `校验不正确`;
}

function check(checkCode, numbers) {
    const sum = numbers
        .map(number => parseInt(number))
        .reduce((a, b) => a + b);
    return (10 - sum % 10) === parseInt(checkCode);
}

module.exports = {
    transPostcode: transPostcode,
    buildNumbers: buildNumbers,
    buildPostcode: buildPostcode
}





