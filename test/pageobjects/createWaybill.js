let page = require('./basePage');
let By = page.webdriver.By;
let waitAndClick = page.waitAndClick;
let waitAndSendKeys = page.waitAndSendKeys;
let waitElementIsVisible = page.waitElementIsVisible;
let scrollToElement = page.scrollToElement;
let authorization = require('./authorization');
let opendAuthIndexAndAddCookie = authorization.opendAuthIndexAndAddCookie;
let changeSenderOrRecipient = require('./changeSenderOrRecipient');
let changeSender = changeSenderOrRecipient.changeSender;
let changeRecipient = changeSenderOrRecipient.changeRecipient;

async function opendNewOrder() {
    await waitAndClick(By.xpath('//li/a[@href = "/newOrder/index" ]'));
}

async function createWaybill() {
    try {
        await opendAuthIndexAndAddCookie();
        await opendNewOrder();
        await changeSender("Суми", "Зеленко", "Гончаренко")
        await changeRecipient("Полтава", "Ковпака", "Гончаренко", "Елена", "Александровна", "0951612597");
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
        console.log('Create waybill is failed: ' + Err);
    }
}

createWaybill();