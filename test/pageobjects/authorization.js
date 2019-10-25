let page = require('./basePage');
let driver = page.driver;
let By = page.webdriver.By;
let waitAndClick = page.waitAndClick;
let waitElementIsVisible = page.waitElementIsVisible;
let user = require('./getUserCredentials');

async function openAuthIndex() {
    try {
        return await driver.get('https://my.novaposhta.ua/auth/index');
    } catch (Err) {
        console.log('The page of authorization didn\'t open. ' + Err);
    }
}

async function openAuthIndexAndAddCookie() {
    try {
        await openAuthIndex();
        await driver.manage().addCookie({ name: "PHPSESSID", value: "a246c7d69a8681e80d3d1c1021b1d8c6" });
        await driver.manage().addCookie({ name: "DeviceCode", value: "d99f0301ca5666a56d033f5f5176dcb6" });
        await openAuthIndex();
    } catch (Err) {
        console.log('Invalid cookie. ' + Err);
    }
}

async function authorization(email, password) {
    try {
        await openAuthIndex();
        await waitAndClick(By.xpath('//div/input[@data-type = "person"]'));
        await page.waitAndSendKeys(By.name('LoginForm[username]'), email);
        await page.waitAndSendKeys(By.name('LoginForm[password]'), password);
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

async function getSuccessfulConfirmationText() {
    try {
        let successfulConfirmationElement = await waitElementIsVisible(By.xpath('//form[@class = "form-horizontal shadowed_box"]/div/h5'));
        return await successfulConfirmationElement.getText();
    } catch (Err) {
        console.log('Successful confirmation element did not appeared: ' + Err);
    }
}

async function getErrorText() {
    try {
        let errorElement = await waitElementIsVisible(By.xpath('//div[@class = "errorSummary"]/ul/li'));
        return await errorElement.getText();
    } catch (Err) {
        console.log('Error message did not appeared: ' + Err);
    }
}

module.exports = {
    'authorization': authorization,
    'openAuthIndexAndAddCookie': openAuthIndexAndAddCookie,
    'openAuthIndex': openAuthIndex,
    'comeBackLoginPage': comeBackLoginPage,
    'getSuccessfulConfirmationText': getSuccessfulConfirmationText,
    'getErrorText': getErrorText,
}