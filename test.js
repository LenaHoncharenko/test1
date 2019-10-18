let wd = require('selenium-webdriver');
let assert = require('assert');

let SELENIUM_HOST = 'http://localhost:4444/wd/hub';
let URL = 'http://www.yandex.ru';

let client = new wd.Builder()
   .usingServer(SELENIUM_HOST)
   .withCapabilities({ browserName: 'firefox' })
   .build();

client.get(URL).then(function() {
    client.findElement({ name: 'text' }).sendKeys('test');
    client.findElement({ css: '.b-form-button__input' }).click();

    client.getTitle().then(function(title) {
        assert.ok(title.indexOf('test — Яндекс: нашлось') > -1, 'Ничего не нашлось :(');
    });

    client.quit();
});

/*
По коду все довольно просто:
Подключаем selenium-webdriver;
Инициализируем клиент с указанием нужного браузера и передачей хоста, 
на котором у нас висит selenium-server;
Открываем www.yandex.ru;
После загрузки вводим в поисковой строке () посимвольно “test” 
и кликаем на кнопку (она будет найдена по CSS-селектору ‘.b-form-button__input');
Получаем тайтл страницы результатов поиска 
и ищем в нем подстроку 'test — Яндекс: нашлось'.
*/

