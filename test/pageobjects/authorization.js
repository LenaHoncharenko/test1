let page = require('./basePage');
let driver = page.driver;
let By = page.webdriver.By;
let waitAndClick = page.waitAndClick;
let user = require('./getUserCredentials');

async function opendAuthIndex() {
    try {
        return await driver.get('https://my.novaposhta.ua/auth/index');
    } catch (Err) {
        console.log('The page of authorization didn\'t open. ' + Err);
    }
}

async function opendAuthIndexAndAddCookie() {
    try {
        await opendAuthIndex();
        await driver.manage().addCookie({ name: "PHPSESSID", value: "5575491b79de81fdcf9469c52d985f85" });
        await driver.manage().addCookie({ name: "DeviceCode", value: "d99f0301ca5666a56d033f5f5176dcb6" });
        await opendAuthIndex();
    } catch (Err) {
        console.log('Invalid cookie. ' + Err);
    }
}

async function authorization(Email, Password) {
    try {
        await opendAuthIndex();
        await waitAndClick(By.xpath('//div/input[@data-type = "person"]'));
        await driver.findElement(By.name('LoginForm[username]')).sendKeys(Email);
        await driver.findElement(By.name('LoginForm[password]')).sendKeys(Password);
        await driver.findElement(By.name('yt0')).click();
    } catch (Err) {
        console.log('Authorization failed: ' + Err);
    }
}

async function comeBackLoginPage() {
    try {
        await waitAndClick(By.className("btna btns btn lighten js-registration"));
    } catch (Err) {
        console.log('Unable to return to login page: ' + Err);
    }
}

authorization(user.email, user.password);

module.exports = {
    'authorization': authorization,
    'opendAuthIndexAndAddCookie': opendAuthIndexAndAddCookie,
    'opendAuthIndex': opendAuthIndex,
    'comeBackLoginPage': comeBackLoginPage,
}