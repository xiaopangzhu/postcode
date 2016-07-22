const allCodes = require('../spec/fixtures');


function transBarcode(postcode) {
    if (!isCorrectType(postcode)) {
        return `邮编类型不正确`
    }
    const numbers = buildNumbers(postcode);
    const barcode = buildBarcode(numbers, allCodes);
    return barcode
}

function isCorrectType(postcode) {
    const testStr = /[0-9,-]/;
    return (postcode.length === 5 || postcode.length === 9 || postcode.length === 10) && testStr.test(postcode);
}

function buildNumbers(postcode) {
    const codeArray = postcode.replace('-', '').split('');
    const codesSum = codeArray
        .map(code => parseInt(code))
        .reduce((a, b) => a + b)
    const checkCode = 10 - codesSum % 10;
    codeArray.push(checkCode.toString());
    return codeArray;
}

function buildBarcode(numbers, allCodes) {
    const codesText = numbers
        .map(number => allCodes.find(code => code.digit === number).code)
        .join('');
    return `|${codesText}|`
}

module.exports = {
    transBarcode: transBarcode,
    buildNumbers: buildNumbers,
    buildBarcode: buildBarcode

}
