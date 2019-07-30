const webdriverio = require('webdriverio');
const options = require('../wdio.conf');
const client = webdriverio.multiremote(options);

jest.setTimeout(30000);

beforeAll(() => {
  return client.init().url('http://localhost:8080/admin#/login');
});

test('на странице есть кнопка "войти"', () => {
  return client
      .isExisting('.login__form-submit')
      .then(browsers => {
          for (const browserName in browsers) {
              expect(browsers[browserName]).toBe(true);
          }
      })
});
test('на странице есть поле "Логин"', () => {
  return client
      .isExisting('.login__form-input--login')
      .then(browsers => {
          for (const browserName in browsers) {
              expect(browsers[browserName]).toBe(true);
          }
      })
});

test('на странице есть поле "Пароль"', () => {
  return client
      
      .then(browsers => {
          for (const browserName in browsers) {
              expect(browsers[browserName]).toBe(true);
          }
      })
});
describe('кнопка ВОЙТИ недоступна пока',()=>{
  test('данные не введены',()=>{
    return client
      .getValue('.login__form-input--password')
      .then(browsers => {
        for (const browserName in browsers) {
            expect(browsers[browserName]).toBe('');
        }
      })
      .getValue('.login__form-input--login')
      .then(browsers => {
        for (const browserName in browsers) {
            expect(browsers[browserName]).toBe('');
        }
      })
      .isEnabled('.login__form-submit')
      .then(browsers => {
        for (const browserName in browsers) {
            expect(browsers[browserName]).toBe(false);
        }
      })
  });
  test('пароль не введен',()=>{
    return client
      .getValue('.login__form-input--password')
      .then(browsers => {
        for (const browserName in browsers) {
            expect(browsers[browserName]).toBe('');
        }
      })
      .isEnabled('.login__form-submit')
      .then(browsers => {
        for (const browserName in browsers) {
            expect(browsers[browserName]).toBe(false);
        }
      })
  });

  test('логин не введен',()=>{
    return client
      .getValue('.login__form-input--login')
      .then(browsers => {
        for (const browserName in browsers) {
            expect(browsers[browserName]).toBe('');
        }
      })
      .isEnabled('.login__form-submit')
      .then(browsers => {
        for (const browserName in browsers) {
            expect(browsers[browserName]).toBe(false);
        }
      })
  });
})


test('при клике на кнопку войти появляется Tooltip ', () => {
  return client
      .click('.login__form-submit')
      .getCssProperty('.serverMessage-wrap', 'transform')
      .then(browsers => {
          for (const browserName in browsers) {
              expect(browsers[browserName].value).toBe("matrix(1, 0, 0, 1, -234.5, 78)");
          }
      })
});

afterAll(() => {
  return client.end();
});