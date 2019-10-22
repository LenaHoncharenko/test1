require( 'chromedriver' );

let webdriver = require( 'selenium-webdriver' ),
    By = webdriver.By,
    until = webdriver.until;

let driver = new webdriver.Builder( )
    .forBrowser( 'chrome' )
    .build( );

const userEmail = 'ENTER EMAIL';
const userPassword = 'ENTER PASSWORD'

function waitAndClick(locator) {
	let button = driver.wait( until.elementLocated( locator ), 80000 );
	button.click( );
}

function waitAndSendKeys(locator, value) {
	let input = driver.wait( until.elementLocated( locator ), 80000 );
    input.sendKeys(value);
}

driver.get( 'https://my.novaposhta.ua/auth/index' );

driver.manage( ).addCookie( {name:"PHPSESSID", value:"bf3c318ac6cc5a19bc38ee44a64f8b92"} );
driver.manage( ).addCookie( {name:"DeviceCode", value:"d99f0301ca5666a56d033f5f5176dcb6"} );

driver.get( 'https://my.novaposhta.ua/auth/index' );

waitAndClick( By.xpath( '//div/input[ @data-type = "person" ]' ) );

driver.findElement( By.name( 'LoginForm[username]' ) ).sendKeys(userEmail);
driver.findElement( By.name( 'LoginForm[password]' ) ).sendKeys(userPassword);
driver.findElement( By.name( 'yt0' ) ).click( );

waitAndClick( By.xpath( '//li/a[@href = "/newOrder/index" ]' ) );
waitAndClick( By.id( 'SenderSelectButton' ) );
waitAndClick( By.xpath( '//div[@id = "filter_journal_cities_div"][1]//div/i[@class = "icon-remove"]' ) );

waitAndSendKeys( By.id( 'filter_journal_cities' ) , 'Полтава' );
console.log('entered poltava');

waitAndClick( By.xpath( '//li[@class = "browser_element_main active"]/a[1][ contains(text( ), "Полтава") ]' ) );
console.log('clicked poltava');

waitAndSendKeys( By.id( 'filter_journal_address' ) , 'Ковпака' );
console.log('entered kovpaka');

waitAndClick( By.xpath( '//li[@class = "browser_element_main active"]/a[1][ contains(text( ), "Ковпака") ]' ) );
console.log('clicked kovpaka');
