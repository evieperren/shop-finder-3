require('dotenv').config();
const server = require('./src/index');

switch (process.env.NODE_ENV) {
  case 'production':
    server.listen(process.env.PROD_PORT, () => { console.log(`Connected on port ${process.env.PROD_PORT}`); });
    break;
  case undefined:
    console.log(new Error('Please set an environment'));
    break;
  default:
    server.listen(process.env.DEV_PORT, () => { console.log(`Connected on port ${process.env.DEV_PORT}`); });
    break;
}
