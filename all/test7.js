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
	driver.wait( until.elementLocated( locator ), 80000 )
	.then( element => element.click( ) );
	}

function waitAndSendKeys(locator, value) {
	driver.wait( until.elementLocated( locator ), 80000 )
   .then( element => element.sendKeys(value) );
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

waitAndSendKeys( By.id( 'filter_journal_cities' ) , 'Суми' );

waitAndClick( By.xpath( '//li[@class = "browser_element_main active"]/a[1][ contains(text( ), "Суми") ]' ) );

waitAndSendKeys( By.id( 'filter_journal_address' ) , 'Зеленко' );

waitAndClick( By.xpath( '//li[@class = "browser_element_main active"]/a[1][ contains(text( ), "Зеленко") ]' ) );

waitAndSendKeys( By.id( 'filter_journal_contacts', 'Гончаренко' ) );

waitAndClick( By.id( "3d97cb9e-5587-11e9-9937-005056881c6b" ) );
waitAndClick( By.id( "selectCounterpartyButton" ) );

waitAndClick(By.id( "RecipientSelectButton") );
/*
waitAndClick( By.xpath( '//div[@id = "filter_journal_cities_div"][1]//div/i[@class = "icon-remove"]' ) );

waitAndSendKeys( By.id( 'filter_journal_cities' ) , 'Полтава' );

waitAndClick( By.xpath( '//li[@class = "browser_element_main"]/a[1][ contains(text( ), "Полтава") ]' ) );

waitAndSendKeys( By.id( 'filter_journal_address' ) , 'Ковпака' );

waitAndClick( By.xpath( '//li[@class = "browser_element_main"]/a[1][ contains(text( ), "Ковпака") ]' ) );

waitAndClick( By.xpath( '//div/a[@class = "btn btn-np btn-second createContact"]' ) );

waitAndSendKeys( By.id( 'contactLastName' ), "Honcharenko" );
driver.findElement( By.id( 'contactFirstName') ).sendKeys( "Elena" );
driver.findElement( By.id( 'contactMiddleName' ) ).sendKeys( "Alexandrovna" );

//waitAndClick( By.id( "selectCounterpartyButton" ) );
*/




