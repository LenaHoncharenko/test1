const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require('faker');
const expect = require("chai").expect;
let authorization = require("./pageobjects/authorization");
let login = authorization.authorization;
let getSuccessfulConfirmationText = authorization.getSuccessfulConfirmationText;
let user = require('./pageobjects/getUserCredentials');


describe("Login", () => {

    it("Positive test: login with a valid username and password", async () => {
        console.log('test1 start');
        // await login(user.email, user.password);
         //let erText = await getSuccessfulConfirmationText();
         //expect(erText).to.equal('Вам відправлено КОД в СМС для авторизації. Введіть його сюди');
    });

    it("Login with an invalid username", async () => {
        console.log('test2 start'); // todo add click BACK button
        await login(faker.internet.email(), faker.internet.password());
        let erText = await getSuccessfulConfirmationText();  // todo add get error text function
        expect(erText).to.contains('Вам відправлено КОД в СМС для авторизації. Введіть його сюди');
    });

    /*it("Login with a valid username and invalid password", async done => {
        console.log('test3 start');
        await login(user.email, faker.password);
        done();
    });

    it("Login with swapping username and password", async done => {
        console.log('test4 start');
        await login(user.password, user.email);
        done();
    });*/
});

