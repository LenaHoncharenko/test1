require( 'chromedriver' );
 
let webdriver = require( 'selenium-webdriver' ),
    By = webdriver.By,
    until = webdriver.until;
 
let driver = new webdriver.Builder( )
    .forBrowser( 'chrome' )
    .build( );
 
driver.get( 'https://my.novaposhta.ua/auth/index');
 
 
 
driver.manage( ).addCookie({name:"PHPSESSID", value:"a9bce9bfdba27b5cdb53bbaf9866acf3"});
driver.manage( ).addCookie({name:"DeviceCode", value:"e64394742f559509aedf93e883d31ce7"});
 
driver.get('https://my.novaposhta.ua/auth/index');
 
function wait(locator) {
    return driver.wait(until.elementLocated(locator), 15000);
}
 
async function waitAndClick(locator) {
        wait(locator);
        driver.findElement(locator).click();
        return await driver.findElement(locator);
    };
 
async function waitAndSendKeys(locator, value) {
    return await wait(locator)
        .then( element => element.sendKeys(value) );
}
 
async function waitElementIsVisible(locator) {
    return await driver.wait(until.elementIsVisible(wait(locator), 10000));
}
 
 async function setAddress(city, street) {
   
   await waitAndClick( By.xpath( '//div[@id = "filter_journal_cities_div"][1]//div/i[@class = "icon-remove"]' ) );
    await waitAndSendKeys( By.id( 'filter_journal_cities' ) , city );
    await waitElementIsVisible( By.xpath( `//li[@class = "browser_element_main active"]/a[1][ contains(text( ), "${city}") ]` ) );
    await driver.sleep(500);
    await waitAndSendKeys( By.id( 'filter_journal_address' ) , street);
    await waitElementIsVisible( By.xpath( `//li[@class = "browser_element_main active"]/a[1][ contains(text( ), "${street}") ]` ) );
 }
 
 async function createContact(lastName, firstName, middleName, phoneNumber) {
    await waitAndClick( By.xpath( '//div/a[@class = "btn btn-np btn-second createContact"]' ) );
    await waitElementIsVisible( By.xpath( '//div[@id="contactModal"]//div[@class = "control-group cellLastName"]//input' ) );
    await waitAndSendKeys( By.xpath( '//div[@id="contactModal"]//div[@class = "control-group cellLastName"]//input' ), lastName );
    await driver.findElement( By.xpath( '//div[@id="contactModal"]//div[@class = "control-group cellFirstName"]//input' ) ).sendKeys(firstName);
    await driver.findElement( By.xpath( '//div[@id="contactModal"]//div[@class = "control-group cellMiddleName"]//input') ).sendKeys(middleName);
    await driver.findElement( By.xpath('//div[@class = "intl-tel-input"]/input[@type = "tel"]') ).sendKeys(phoneNumber);
    await waitAndClick( By.xpath('//div[@class = "modal-footer my_control_cent"]/button[@id = "counterpartyContactSaveButton"]') );
 }
 
 async function scrollToElement(locator) {
    await driver.executeScript("arguments[0].scrollIntoView(true));", driver.findElement(locator));
 }
 
async function testEverything() {
    await waitAndClick(By.xpath("//a[@class='logo_in']"));
    console.log('click1');
    await waitAndClick(By.xpath( '//li/a[@href = "/newOrder/index" ]' ));
    console.log('click2');
    await waitAndClick( By.id( 'SenderSelectButton' ) );
    console.log('click3');
    await setAddress("Суми", "Зеленко");
    console.log('click4');
    await waitAndSendKeys( By.id( 'filter_journal_contacts' ), 'Гончаренко' );
    console.log('click5');
    await waitElementIsVisible( By.xpath( '//ul[@id = "contacts_ul"]/li[1][@data-lastname = "Гончаренко" ]') );
    console.log('click6');
    await waitAndClick( By.id( "selectCounterpartyButton" ) );
    console.log('click7');
    await driver.findElement( By.id( "RecipientSelectButton") ).click( );
    console.log('click8');
    await setAddress("Полтава", "Ковпака");
    console.log('click9');
    await createContact("Гончаренко", "Елена", "Александровна", "0951612597");
    await console.log('click10');
    await waitElementIsVisible( By.id( 'filter_journal_contacts' ) );
    await console.log('click11');
    await waitAndSendKeys( By.id( 'filter_journal_contacts' ), 'Гончаренко' );
    await console.log('click12');
    await waitElementIsVisible( By.xpath( '//ul[@id = "contacts_ul"]/li[1][@data-lastname = "Гончаренко" ]') );
    await console.log('click13');
    await waitAndClick( By.id( "selectCounterpartyButton" ) );
    await console.log('click14');
    await waitElementIsVisible( By.xpath( '//div[@id = "blockTypesOfPayers"]/div/button[@id = "RecipientPayer"]' ) );
    await console.log('click15');
    await waitAndClick( By.xpath('//span[@id = "cargoTypesSelectBoxIt"]/span[@id = "cargoTypesSelectBoxItArrowContainer"]') );
    await console.log('click16');
    await waitElementIsVisible( By.xpath('//ul[@id = "cargoTypesSelectBoxItOptions"]/li[@data-val = "Cargo"]') );
    await waitAndClick( By.xpath('//ul[@id = "cargoTypesSelectBoxItOptions"]/li[@data-val = "Cargo"]') );
    await waitAndSendKeys(By.id('Weight'), '0.01');
    await waitAndSendKeys(By.id('VolumeGeneral'), '0.01');
    await waitAndSendKeys(By.id('seatsAmount'), '1');
    await waitAndSendKeys(By.id('cost'), '1');
    await waitAndSendKeys(By.id('Description'), 'Документи');
    await waitAndClick(By.xpath('//ul[@class = "typeahead dropdown-menu"]/li[@data-value = "Документи"]'));
    await waitAndClick(By.id('submitNewOrderButton'));
}
 
testEverything();
//waitAndClick( By.xpath( '//div/input[ @data-type = "person" ]' ) );
 
//driver.findElement( By.name( 'LoginForm[username]' ) ).sendKeys(userEmail);
//driver.findElement( By.name( 'LoginForm[password]' ) ).sendKeys(userPassword);
//driver.findElement( By.name( 'yt0' ) ).click( );