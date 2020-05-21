require('dotenv').config();
const server = require('./src/index');

const portSetup = server.listen(process.env.PORT, () => { console.log(`Connected on port ${process.env.PORT}`); });

// module.exports = portSetup