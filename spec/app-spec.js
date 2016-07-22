const postcodeApp = require('./../main/postcode-app');
const barcodeApp = require('./../main/barcode-app');
const allCodes = require('../spec/fixtures');


describe('postcode', ()=> {
    it('buildNumbers', ()=> {
        const postcode = `12345-6789`;
        const expectNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '5'];
        expect(postcodeApp.buildNumbers(postcode)).toEqual(expectNumbers);
    });

    it('buildBarcode', ()=> {
        const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '5'];
        const expectBarcode = `|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|`;
        expect(postcodeApp.buildBarcode(numbers, allCodes)).toEqual(expectBarcode);
    });

    it('transBarcode', ()=> {
        const postcode = `12345-6789`;
        const expectBarcode = `|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|`;
        expect(postcodeApp.transBarcode(postcode)).toEqual(expectBarcode);
    });
});

describe('barcode', ()=> {

    it('buildNumbers',()=>{
        const barcode = `|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|`;
        const expectNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '5'];
        expect(barcodeApp.buildNumbers(barcode,allCodes)).toEqual(expectNumbers);
    })

    it('buildPostcode',()=>{
        const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '5'];
        const expectPostcode = '123456789';
        expect(barcodeApp.buildPostcode(numbers)).toEqual(expectPostcode);
    })

    it('transPostcode',()=>{
        const barcode = `|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|`;
        const expectPostcode = `123456789`;
        expect(barcodeApp.transPostcode(barcode)).toEqual(expectPostcode);
    })
});