const faker = require('faker');
const expect = require("chai").expect;
let authorization = require("./pageobjects/authorization");
let login = authorization.authorization;
let user = require('./pageobjects/getUserCredentials');


describe("Login", () => {

    it("Positive test: login with a valid username and password", () => {
        login(user.email, user.password);
    });

    it("Login with an invalid username", () => {
        login(faker.email, faker.password);
    });

    it("Login with a valid username and invalid password", () => {
        login(user.email, faker.password);
    });

    it("Login with swapping username and password", () => {
        login(user.password, user.email);
    });
});


/*
        let textToCheck = await driver.findElement(By.xpath(блаблабла)).getText()
expect(textToCheck).to.equals("AAAAAAAAAA, GREAT");


expect(sheetsPage.filterWrapper.$('div[class*=active]').getText(),
'active filter tab').to.have.string('Disabled');
*/