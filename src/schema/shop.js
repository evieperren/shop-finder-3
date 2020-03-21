const mongoose = require('mongoose')

const ShopSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  location: {
    postcode: {
      type: String,
      required: true
    },
    town: {
      type: String,
      required: true
    },
    online: {
      type: Boolean,
      required: true
    }
  },
  scale: {
    type: String,
    required: true
  }
})

module.exports = ShopSchema