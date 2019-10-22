require('chromedriver');

let webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

const userDate = require('./getUserCredentials.js').default;
user = userDate.getUserCredentials();

async function waitAndClick(locator) {
    await driver.wait(until.elementLocated(locator), 15000);
    driver.findElement(locator).click();
    return await driver.findElement(locator);
};

async function authorization(Email, Password) {
    try {
        await driver.get('https://my.novaposhta.ua/auth/index');
        await waitAndClick(By.xpath('//div/input[ @data-type = "person" ]'));
        await driver.findElement(By.name('LoginForm[username]')).sendKeys(Email);
        await driver.findElement(By.name('LoginForm[password]')).sendKeys(Password);
        await driver.findElement(By.name('yt0')).click();
    } catch (Err) {
        console.log('This test is broken of fail' + Err);
    }
}

authorization(user.email, user.password);