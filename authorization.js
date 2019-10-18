require( 'chromedriver' );

let webdriver = require( 'selenium-webdriver' ),
    By = webdriver.By,
    until = webdriver.until;

let driver = new webdriver.Builder( )
    .forBrowser( 'chrome' )
    .build( );

const userEmail = 'olenahoncharenko1994@gmail.com';
const userPassword = '455515558a'

driver.get( 'https://novaposhta.ua/' );
driver.findElement( By.className( 'logo_in' ) ).click( );
const button = driver.wait( until.elementLocated( By.xpath('//div/input[@data-type="person"]') ), 
  20000
);
button.click( );
driver.findElement( By.id( 'inputEmail_1') ).sendKeys(userEmail);
driver.findElement( By.id( 'inputPassword_1') ).sendKeys(userPassword);
driver.findElement(By.name( 'yt0') ).click( );
