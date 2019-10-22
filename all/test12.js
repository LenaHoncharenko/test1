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
	return driver.wait( until.elementLocated( locator ), 80000 )
			  .then( element => element.click( ) );
}

function waitAndSendKeys(locator, value) {
	return driver.wait( until.elementLocated( locator ), 80000 )
			  .then( element => element.sendKeys(value) );
}

function waitIsVisibleAndClick (locator) {
	driver.wait( until.elementLocated( locator ), 80000 )
	.then(element => { return driver.wait(until.elementIsVisible(element), 80000) } )
	.then( element => element.click( ) );
}

driver.get( 'https://my.novaposhta.ua/auth/index' );

driver.manage( ).addCookie( {name:"PHPSESSID", value:"bf3c318ac6cc5a19bc38ee44a64f8b92"} );
driver.manage( ).addCookie( {name:"DeviceCode", value:"d99f0301ca5666a56d033f5f5176dcb6"} );

driver.get( 'https://my.novaposhta.ua/auth/index' );

waitAndClick( By.xpath( '//div/input[ @data-type = "person" ]' ) );

driver.findElement( By.name( 'LoginForm[username]' ) ).sendKeys(userEmail);
driver.findElement( By.name( 'LoginForm[password]' ) ).sendKeys(userPassword);
driver.findElement( By.name( 'yt0' ) ).click( );

waitAndClick( By.xpath( '//li/a[@href = "/newOrder/index" ]' ) )
	.then( waitIsVisibleAndClick( By.id( 'SenderSelectButton' ) ) )
	.then( waitIsVisibleAndClick( By.xpath( '//div[@id = "filter_journal_cities_div"][1]//div/i[@class = "icon-remove"]' ) ) )
	.then( waitAndSendKeys( By.id( 'filter_journal_cities' ) , 'Суми' ) )
	.then( waitIsVisibleAndClick( By.xpath( '//li[@class = "browser_element_main active"]/a[1][ contains(text( ), "Суми") ]' ) ) )
	.then( waitAndSendKeys( By.id( 'filter_journal_address' ) , "Зеленко" ) ) 
	.then( waitIsVisibleAndClick( By.xpath( '//li[@class = "browser_element_main active"]/a[1][ contains(text( ), "Зеленко") ]' ) ) )
	.then( waitAndSendKeys( By.id( 'filter_journal_contacts' ), 'Гончаренко' ) ) 
	.then( waitIsVisibleAndClick( By.xpath( '//ul[@id = "contacts_ul"]/li[1][@data-lastname = "Гончаренко" ]' ) ) )
	.then( waitIsVisibleAndClick( By.id( "selectCounterpartyButton" ) ) )
	.then( waitIsVisibleAndClick( By.id( "cargoTypesSelectBoxItArrowContainer" ) ) )
	.then( waitIsVisibleAndClick( By.xpath( '//ul[@id = "cargoTypesSelectBoxItOptions"]/li[@data-val = "Cargo"]' ) ) );
	/*
	.then( waitAndClick(By.id( "RecipientSelectButton") ) )
	.then( waitAndClick( By.xpath( '//div[@id = "filter_journal_cities_div"][1]//div/i[@class = "icon-remove"]' ) ) )
	.then( waitAndSendKeys( By.id( 'filter_journal_cities' ) , 'Полтава' ) )
	.then( waitAndClick( By.xpath( '//li[@class = "browser_element_main"]/a[1][ contains(text( ), "Полтава") ]' ) ) )
	.then( waitAndSendKeys( By.id( 'filter_journal_address' ) , 'Ковпака' ) )
	.then( waitAndClick( By.xpath( '//li[@class = "browser_element_main"]/a[1][ contains(text( ), "Ковпака") ]' ) ) )
	.then( waitAndClick( By.xpath( '//div/a[@class = "btn btn-np btn-second createContact"]' ) ) );
	
		
		
	.then( waitAndClick(By.id( "RecipientSelectButton") ) );
	.then( waitAndClick( By.xpath( '//div[@id = "filter_journal_cities_div"][1]//div/i[@class = "icon-remove"]' ) ) )
	.then( waitAndSendKeys( By.id( 'filter_journal_cities' ) , 'Полтава' ) )
	.then( waitAndClick( By.xpath( '//li[@class = "browser_element_main"]/a[1][ contains(text( ), "Полтава") ]' ) ) )
	.then( waitAndSendKeys( By.id( 'filter_journal_address' ) , 'Ковпака' ) )
	.then( waitAndClick( By.xpath( '//li[@class = "browser_element_main"]/a[1][ contains(text( ), "Ковпака") ]' ) ) )
	.then( waitAndClick( By.xpath( '//div/a[@class = "btn btn-np btn-second createContact"]' ) ) )
	.then( waitAndSendKeys( By.id( 'contactLastName' ), "Honcharenko" ) )
	.then( driver.findElement( By.id( 'contactFirstName') ).sendKeys( "Elena" ) )
	.then( driver.findElement( By.id( 'contactMiddleName' ) ).sendKeys( "Alexandrovna" ) )


//waitAndClick( By.id( "selectCounterpartyButton" ) );

*/







