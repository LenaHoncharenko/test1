require( 'chromedriver' );

let webdriver = require( 'selenium-webdriver' ),
    By = webdriver.By,
    until = webdriver.until;

let driver = new webdriver.Builder( )
    .forBrowser( 'chrome' )
    .build( );
	
driver.get( 'https://my.novaposhta.ua/orders/index' );
driver.findElement( By.xpath('//li/a[@href="/newOrder/index"]') ).click( );
const button = driver.wait( until.elementLocated( By.id('SenderSelectButton') ), 
  20000
);
button.click( );

