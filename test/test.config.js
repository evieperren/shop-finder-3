require('dotenv').config
const mongoose = require('mongoose')

module.exports = {
  mongoose,
  connect: () => {
    mongoose.Promise = Promise;
    mongoose.connect(config.database[process.env.TEST_DATABASE]);
  },
  disconnect: done => {
    mongoose.disconnect(done);
  }
};