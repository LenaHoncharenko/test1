const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
class driver {
    constructor() {
        this.driver = new Builder()
            .forBrowser('chrome')
            .build();
    }
}

module.exports = driver;