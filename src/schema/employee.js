const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
  name: {
    first: {
      type: String,
      required: [true, 'Please provide a first name'],
      minLength: 2,
      maxLength: 144,
      uppercase: true,
      trim: true,
      validate: {
        validator: (value) => /([a-zA-Z])\w/.test(value),
        message: 'Please remove non-letter characters',
      },
    },
    last: {
      type: String,
      required: [true, 'Please provide a last name'],
      minLength: 2,
      maxLength: 144,
      uppercase: true,
      trim: true,
      validate: {
        validator: (value) => /([a-zA-Z])\w/.test(value),
        message: 'Please remove non-letter characters',
      },
    },
  },
  store: {
    name: {
      type: String,
      required: [true, 'Please provide a store name'],
      minLength: 2,
      maxLength: 144,
      trim: true,
      validate: {
        validator: (value) => /([a-zA-Z])\w/.test(value),
        message: 'Please remove non-letter characters',
      },
    },
    shopId: {
      type: String,
      required: [true, 'Please provide a shop ID'],
      trim: true,
      validate: {
        validator: (value) => /([a-zA-Z0-9])\w/.test(value),
        message: 'Please remove non-letter and non-numeric characters',
      },
    },
  },
  contactDetails: {
    telephone: {
      type: String,
      required: [true, 'Please provide a contact number'],
      minLength: 9,
      maxLength: 11,
      trim: true,
      validate: {
        validator: (value) => /([0-9])\w/.test(value),
        message: 'Please remove non-numeric characters',
      },
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide an email address'],
      validate: {
        validator: (value) => /^[a-zA-z]{2,144}((.){1}[a-zA-Z]{2,144})?(@)[a-zA-Z]{2,144}(.){1}([a-zA-Z]{3})/.test(value),
        message: 'Please provide a valid email address',
      },
      trim: true,
    },
    postcode: {
      type: String,
      required: [true, 'Please provide a postcode'],
      uppercase: true,
      trim: true,
      validate: {
        validator: (value) => /((^([a-zA-Z]){1,2})([0-9]{1,2})([a-zA-Z]{1})? ([0-9]{1})(([a-zA-Z]){2}))/.test(value),
        message: 'Please provide a valid UK postcode',
      },
    },
  },
  startDate: {
    type: String,
    required: [true, 'Please provide a start date'],
    validate: {
      validator: (value) => /([0-9]{2})\/([0-9]{2})\/([0-9]{4})/.test(value),
      message: 'Please provide a valid start date in the format DD/MM/YYYY',
    },
  },
  emergencyContact: {
    name: {
      type: String,
      required: [true, 'Please provide a valid emergency contact name'],
      minLength: 2,
      maxLength: 144,
      uppercase: true,
      trim: true,
      validate: {
        validator: (value) => /([a-zA-Z])\w/.test(value),
        message: 'Please remove non-letter characters',
      },
    },
    telephone: {
      type: String,
      required: [true, 'Please provide an emergency contact number'],
      minLength: 9,
      maxLength: 11,
      trim: true,
      validate: {
        validator: (value) => /(^0)([0-9]){9,11}\w+/.test(value),
        message: 'Please remove non-numeric characters',
      },
    },
    relation: {
      type: String,
      required: [true, 'Please provide a valid relation'],
      enum: ['parent', 'sibling', 'guardian', 'friend', 'collegue', 'wife', 'husband', 'child'],
    },
  },
});

module.exports = EmployeeSchema;
