require('chromedriver');

let webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

let driver = function() {
    return new webdriver.Builder()
        .forBrowser('chrome')
        .build();
}

async function waitAndClick(locator) {
    await driver.wait(until.elementLocated(locator), 15000);
    driver.findElement(locator).click();
    return await driver.findElement(locator);
};

async function waitAndSendKeys(locator, value) {
    return await driver.wait(until.elementLocated(locator), 20000)
        .then(element => element.sendKeys(value));
}

async function waitElementIsVisible(locator) {
    return await driver.wait(until.elementIsVisible(driver.findElement(locator)), 30000);
}

module.exports = {
    'driver': driver,
    'webdriver': webdriver,
    'waitAndClick': waitAndClick,
    'waitAndSendKeys': waitAndSendKeys,
    'waitElementIsVisible': waitElementIsVisible,
}
