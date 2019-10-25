const expect = require("chai").expect;
const faker = require("faker");
let authorization = require("./pageobjects/authorization");
let login = authorization.authorization;
let getSuccessfulConfirmationText = authorization.getSuccessfulConfirmationText;
let getErrorText = authorization.getErrorText;
let user = require('./pageobjects/getUserCredentials');


describe("Login", () => {

    it("Positive test: login with a valid username and password", async() => {
        console.log('test1 start');
        await login(user.email, user.password);
        let erText = await getSuccessfulConfirmationText();
        expect(erText).to.equal('Вам відправлено КОД в СМС для авторизації. Введіть його сюди');
    });

    it("Login with an invalid username", async() => {
        console.log('test2 start');
        await login(faker.internet.email(), faker.internet.password());
        let erText = await getErrorText();
        expect(erText).to.contains('Користувач не знайдений!');
    });

    it("Login with a valid username and without password", async() => {
        console.log('test3 start');
        await login(user.email, "");
        let erText = await getErrorText();
        expect(erText).to.contains('має бути заповнено');
    });

    it("Login with a valid username and invalid password", async() => {
        console.log('test4 start');
        await login(user.email, faker.internet.password());
        let erText = await getErrorText();
        expect(erText).to.contains('Невірний пароль!');
    });

    it("Login with swapping username and password", async() => {
        console.log('test5 start');
        await login(user.password, user.email);
        let erText = await getErrorText();
        expect(erText).to.contains('Користувач не знайдений!');
    });

});