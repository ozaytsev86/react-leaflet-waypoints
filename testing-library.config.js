process.env.APP_API_URL = 'http://localhost:8080/api';

afterAll(() => {
  global.gc && global.gc();
});
