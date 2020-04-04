require('dotenv').config();
const server = require('./src/index');

server.listen(process.env.PORT, () => { console.log(`Connected on port ${process.env.PORT}`); });