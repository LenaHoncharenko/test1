let page = require('./basePage');
let driver = page.driver();
let By = page.webdriver.By;
let waitAndClick = page.waitAndClick();
let user = require('./getUserCredentials');

async function opendAuthIndex(){
    return await driver.get('https://my.novaposhta.ua/auth/index');
}

async function opendAuthIndexAndAddCookie(){
    await opendAuthIndex();
    await driver.manage().addCookie({ name: "PHPSESSID", value: "59d33bf649d05d63885aec5e4f79d87f" });
    await driver.manage().addCookie({ name: "DeviceCode", value: "d99f0301ca5666a56d033f5f5176dcb6" });
    await opendAuthIndex();
}

async function authorization(Email, Password) {
    try {
        await opendAuthIndex();
        await waitAndClick(By.xpath('//div/input[ @data-type = "person" ]'));
        await driver.findElement(By.name('LoginForm[username]')).sendKeys(Email);
        await driver.findElement(By.name('LoginForm[password]')).sendKeys(Password);
        await driver.findElement(By.name('yt0')).click();
    } catch (Err) {
        console.log('This test is broken of fail' + Err);
    }
}

authorization(user.email, user.password);

module.exports = {
    'authorization': authorization,
    'opendAuthIndexAndAddCookie': opendAuthIndexAndAddCookie,
    'opendAuthIndex': opendAuthIndex,
};