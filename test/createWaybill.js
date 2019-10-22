const Page = require('./basePage');
console.log(Page);

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

async function setAddress(city, street) {
    await waitAndClick(By.xpath('//div[@id = "filter_journal_cities_div"][1]//div/i[@class = "icon-remove"]'));
    await waitAndSendKeys(By.id('filter_journal_cities'), city);
    await waitAndClick(By.xpath(`//li[@class = "browser_element_main active"]/a[1][ contains(text( ), "${city}") ]`));
    await waitAndSendKeys(By.id('filter_journal_address'), street);
    await waitAndClick(By.xpath(`//li[@class = "browser_element_main active"]/a[1][ contains(text( ), "${street}") ]`));
}

async function createContact(lastName, firstName, middleName, phoneNumber) {
    await waitAndClick(By.xpath('//div/a[@class = "btn btn-np btn-second createContact"]'));
    await waitElementIsVisible(By.xpath('//div[@id="contactModal"]//div[@class = "control-group cellLastName"]//input'));
    await waitAndSendKeys(By.xpath('//div[@id="contactModal"]//div[@class = "control-group cellLastName"]//input'), lastName);
    await waitAndSendKeys(By.xpath('//div[@id="contactModal"]//div[@class = "control-group cellFirstName"]//input'), firstName);
    await waitAndSendKeys(By.xpath('//div[@id="contactModal"]//div[@class = "control-group cellMiddleName"]//input'), middleName);
    await waitAndSendKeys(By.xpath('//div[@class = "intl-tel-input"]/input[@type = "tel"]'), phoneNumber);
    await waitAndClick(By.xpath('//div[@class = "modal-footer my_control_cent"]/button[@id = "counterpartyContactSaveButton"]'));
}

async function scrollToElement(locator) {
    await driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(locator));
}

async function createWaybill() {
    try {
        await driver.get('https://my.novaposhta.ua/auth/index');
        await driver.manage().addCookie({ name: "PHPSESSID", value: "dc4ba784819c1b9347a97d1e1795406e" });
        await driver.manage().addCookie({ name: "DeviceCode", value: "d99f0301ca5666a56d033f5f5176dcb6" });
        await driver.get('https://my.novaposhta.ua/auth/index');
        await waitAndClick(By.xpath('//li/a[@href = "/newOrder/index" ]'));
        await waitAndClick(By.id('SenderSelectButton'));
        await setAddress("Суми", "Зеленко");
        await waitAndSendKeys(By.id('filter_journal_contacts'), 'Гончаренко');
        await waitAndClick(By.xpath('//ul[@id = "contacts_ul"]/li[1][@data-lastname = "Гончаренко" ]'));
        await waitAndClick(By.id("selectCounterpartyButton"));
        await waitAndClick(By.id("RecipientSelectButton"));
        await setAddress("Полтава", "Ковпака");
        await createContact("Гончаренко", "Елена", "Александровна", "0951612597");
        await waitElementIsVisible(By.id('filter_journal_contacts'));
        await waitAndSendKeys(By.id('filter_journal_contacts'), 'Гончаренко');
        await waitAndClick(By.xpath('//ul[@id = "contacts_ul"]/li[1][@data-lastname = "Гончаренко" ]'));
        await waitAndClick(By.id("selectCounterpartyButton"));
        await scrollToElement(By.xpath('//div[@id = "blockTypesOfPayers"]/div/button[@id = "RecipientPayer"]'));
        await waitElementIsVisible(By.xpath('//div[@id = "blockTypesOfPayers"]/div/button[@id = "RecipientPayer"]'));
        await waitAndClick(By.xpath('//div[@id = "blockTypesOfPayers"]/div/button[@id = "RecipientPayer"]'));
        await waitAndClick(By.xpath('//div[@id = "blockPaymentsForms"]/button[@data-type = "Cash"]'));
        await waitAndClick(By.xpath('//span[@id = "cargoTypesSelectBoxIt"]/span[@id = "cargoTypesSelectBoxItArrowContainer"]'));
        await waitElementIsVisible(By.xpath('//ul[@id = "cargoTypesSelectBoxItOptions"]/li[@data-val = "Cargo"]'));
        await waitAndClick(By.xpath('//ul[@id = "cargoTypesSelectBoxItOptions"]/li[@data-val = "Cargo"]'));
        await waitAndSendKeys(By.id('Weight'), '50');
        await waitAndSendKeys(By.id('VolumeGeneral'), '0.01');
        await waitAndSendKeys(By.id('seatsAmount'), '1');
        await waitAndSendKeys(By.id('cost'), '1');
        await waitAndSendKeys(By.id('Description'), 'масажер');
        await waitAndClick(By.xpath('//ul[@class = "typeahead dropdown-menu"]/li[@data-value = "масажер"]'));
        //await waitAndClick(By.id('submitNewOrderButton'));
    } catch (Err) {
        console.log('This test is broken of fail.' + Err);
    }
}

createWaybill();
