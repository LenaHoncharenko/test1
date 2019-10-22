require( 'chromedriver' );
 
let webdriver = require( 'selenium-webdriver' ),
    By = webdriver.By,
    until = webdriver.until;
 
let driver = new webdriver.Builder( )
    .forBrowser( 'chrome' )
    .build( );
 
const userEmail = 'olenahoncharenko1994@gmail.com';
const userPassword = 'ENTER PASSWORD'
 
async function waitAndClick( locator ) {
        await driver.wait( until.elementLocated( locator ), 15000 );
        driver.findElement( locator ).click();
        return await driver.findElement( locator );
    };
	
async function authorization ( ) {
	try {
		 await waitAndClick( By.xpath( '//div/input[ @data-type = "person" ]' ) );
		 await driver.findElement( By.name( 'LoginForm[username]' ) ).sendKeys( userEmail );
		 await driver.findElement( By.name( 'LoginForm[password]' ) ).sendKeys( userPassword );
		 await driver.findElement( By.name( 'yt0' ) ).click( );
	 } catch(Err) {
		console.log('This test is broken of fail' + Err);
	}
}

driver.get( 'https://my.novaposhta.ua/auth/index' );
authorization( );
