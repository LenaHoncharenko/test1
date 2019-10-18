require( 'chromedriver' );

let webdriver = require( 'selenium-webdriver' ),
    By = webdriver.By,
    until = webdriver.until;

let driver = new webdriver.Builder( )
    .forBrowser( 'chrome' )
    .build( );

const userEmail = 'olenahoncharenko1994@gmail.com';
const userPassword = '455515558a'

driver.get( 'https://my.novaposhta.ua/auth/index');

driver.manage( ).addCookie({name:"PHPSESSID", value:"bf3c318ac6cc5a19bc38ee44a64f8b92"});
driver.manage( ).addCookie({name:"DeviceCode", value:"d99f0301ca5666a56d033f5f5176dcb6"});

driver.get('https://my.novaposhta.ua/auth/index');

driver.manage().getCookie('PHPSESSID').then(function (cookie) {
   console.log(cookie);
});


const button = driver.wait( until.elementLocated( By.xpath('//div/input[@data-type="person"]') ), 
  20000
);
button.click( );

driver.findElement( By.name( 'LoginForm[username]') ).sendKeys(userEmail);
driver.findElement( By.name( 'LoginForm[password]') ).sendKeys(userPassword);
driver.findElement(By.name( 'yt0') ).click( );
	


