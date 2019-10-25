let page = require('./basePage');
let By = page.webdriver.By;
let waitAndClick = page.waitAndClick;
let waitAndSendKeys = page.waitAndSendKeys;
let waitElementIsVisible = page.waitElementIsVisible;


async function setAddress(city, street) {
    try {
        await waitAndClick(By.xpath('//div[@id = "filter_journal_cities_div"][1]//div/i[@class = "icon-remove"]'));
        await waitAndSendKeys(By.id('filter_journal_cities'), city);
        await waitAndClick(By.xpath(`//li[@class = "browser_element_main active"]/a[1][ contains(text( ), "${city}") ]`));
        await waitAndSendKeys(By.id('filter_journal_address'), street);
        await waitAndClick(By.xpath(`//li[@class = "browser_element_main active"]/a[1][ contains(text( ), "${street}") ]`));
    } catch (Err) {
        console.log('Set address is failed: ' + Err);
    }
}
/*
async function getAddressText() {
    try {
        let getAddressElement = await waitAndClick(By.xpath(`//li[@class = "browser_element_main active"]/a[1]`));
        return await getAddressElement.getText();
    } catch (Err) {
        console.log('The city or the street you entered does not exist: ' + Err);
    }
}
*/
async function createContact(lastName, firstName, middleName, phoneNumber) {
    try {
        await waitAndClick(By.xpath('//div/a[@class = "btn btn-np btn-second createContact"]'));
        await waitElementIsVisible(By.xpath('//div[@id="contactModal"]//div[@class = "control-group cellLastName"]//input'));
        await waitAndSendKeys(By.xpath('//div[@id="contactModal"]//div[@class = "control-group cellLastName"]//input'), lastName);
        await waitAndSendKeys(By.xpath('//div[@id="contactModal"]//div[@class = "control-group cellFirstName"]//input'), firstName);
        await waitAndSendKeys(By.xpath('//div[@id="contactModal"]//div[@class = "control-group cellMiddleName"]//input'), middleName);
        await waitAndSendKeys(By.xpath('//div[@class = "intl-tel-input"]/input[@type = "tel"]'), phoneNumber);
        await waitAndClick(By.xpath('//div[@class = "modal-footer my_control_cent"]/button[@id = "counterpartyContactSaveButton"]'));
    } catch (Err) {
        console.log('Create contact is failed: ' + Err);
    }
}

async function setContact(lastName) {
    try {
        await waitElementIsVisible(By.id('filter_journal_contacts'));
        await waitAndSendKeys(By.id('filter_journal_contacts'), lastName);
        await waitAndClick(By.xpath(`//ul[@id = "contacts_ul"]/li[1][@data-lastname = "${lastName}" ]`));
    } catch (Err) {
        console.log('Set contact is failed: ' + Err);
    }
}

async function openChangeSender() {
    try {
        await waitAndClick(By.id('SenderSelectButton'));
    } catch (Err) {
        console.log('Unable to open change sender: ' + Err);
    }
}

async function changeSender(city, street, lastName) {
    try {
        await openChangeSender();
        await setAddress(city, street);
        await setContact(lastName);
        await waitAndClick(By.id("selectCounterpartyButton"));
    } catch (Err) {
        console.log('Change sender is failed: ' + Err);
    }
}

async function openChangeRecipient() {
    try {
        await waitAndClick(By.id("RecipientSelectButton"));
    } catch (Err) {
        console.log('Unable to open change recipient: ' + Err);
    }
}

async function changeRecipient(city, street, lastName, firstName, middleName, phoneNumber) {
    try {
        await openChangeRecipient();
        await setAddress(city, street);
        await createContact(lastName, firstName, middleName, phoneNumber);
        await setContact(lastName);
        await waitAndClick(By.id("selectCounterpartyButton"));
    } catch (Err) {
        console.log('Change recipient is failed: ' + Err);
    }
}

module.exports = {
    'setAddress': setAddress,
    //'getAddressText': getAddressText,
    'createContact': createContact,
    'setContact': setContact,
    'openChangeSender': openChangeSender,
    'changeSender': changeSender,
    'openChangeRecipient': openChangeRecipient,
    'changeRecipient': changeRecipient,
}