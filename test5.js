var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder()
    .withCapabilities({'browserName': 'firefox'})
    .build();

// set the domain
driver.get('http://127.0.0.1:1337/');

// set a cookie on the current domain
driver.manage().addCookie("test", "cookie-1");

// get a page with the cookie
driver.get('http://127.0.0.1:1337/');

// read the cookie
driver.manage().getCookie('test').then(function (cookie) {
   console.log(cookie);
});

driver.quit();