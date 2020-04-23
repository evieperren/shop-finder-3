const mongoose = require('mongoose');

const ShopSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    validate: {
      validator: (value) => /([a-zA-Z])\w/.test(value),
      message: 'Please remove non-letter characters',
    },
  },
  type: {
    type: String,
    required: [true, 'Please provide a type'],
    trim: true,
    validate: {
      validator: (value) => /([a-zA-Z])\w/.test(value),
      message: 'Please remove non-letter characters',
    },
  },
  location: {
    postcode: {
      type: String,
      required: [true, 'Please provide a postcode'],
      trim: true,
      validate: {
        validator: (value) => /((^([a-zA-Z]){1,2})([0-9]{1,2})([a-zA-Z]{1})? ([0-9]{1})(([a-zA-Z]){2}))/.test(value),
        message: 'Please provide a valid UK postcode',
      },
    },
    town: {
      type: String,
      required: [true, 'Please provide a town'],
      trim: true,
      validate: {
        validator: (value) => /([a-zA-Z])\w/.test(value),
        message: 'Please remove non-letter characters',
      },
    },
    online: {
      type: Boolean,
      required: [true, 'Please provide a value'],
      trim: true,
    },
  },
  scale: {
    type: String,
    required: [true, 'Please provide a valid'],
    enum: ['local', 'national', 'global', 'international'],
    trim: true,
  },
});

module.exports = ShopSchema;
