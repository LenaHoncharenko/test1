require('chromedriver');

let webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

async function waitAndClick(locator) {
    try {
        await driver.wait(until.elementLocated(locator), 20000);
        driver.findElement(locator).click();
        return await driver.findElement(locator);
    } catch (Err) {
        console.log('Click on button is failed: ' + Err);
    }
}

async function waitAndSendKeys(locator, value) {
    try {
        return await driver.wait(until.elementLocated(locator), 20000)
            .then(element => element.sendKeys(value));
    } catch (Err) {
        console.log('Send keys is failed: ' + Err);
    }
}

async function waitElementIsVisible(locator) {
    try {
        return await driver.wait(until.elementIsVisible(driver.findElement(locator)), 30000);
    } catch (Err) {
        console.log('The element is not visible. ' + Err);
    }
}

async function scrollToElement(locator) {
    try {
        await driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(locator));
    } catch (Err) {
        console.log('Scroll to element is failed: ' + Err);
    }
}

module.exports = {
    'driver': driver,
    'webdriver': webdriver,
    'waitAndClick': waitAndClick,
    'waitAndSendKeys': waitAndSendKeys,
    'waitElementIsVisible': waitElementIsVisible,
    'scrollToElement': scrollToElement,
}