const expect = require("chai").expect;
const faker = require("faker");
let authorization = require("./pageobjects/authorization");
let createWaybill = require("./pageobjects/createWaybill");
let openNewOrder = createWaybill.openNewOrder;
let changeSenderOrRecipient = require("./pageobjects/changeSenderOrRecipient");
let openChangeRecipient = changeSenderOrRecipient.openChangeRecipient;
let setAddress = changeSenderOrRecipient.setAddress;
//let getAddressText = changeSenderOrRecipient.getAddressText;


describe("Search address", () => {
    it("Search for cities and streets with existing names", async() => {
        console.log('test1 start');
        await authorization.openAuthIndexAndAddCookie();
        await openNewOrder();
        await openChangeRecipient();
        await setAddress("Полтава", "Ковпака");
        //let address = await getAddressText();
        //expect(address).to.contains("Полтава");
        //expect(address).to.contains("Ковпака");
    });
});