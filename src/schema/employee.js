const mongoose = require('mongoose')

const EmployeeSchema = mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },
  store: {
    name: {
      type: String,
      required: true
    },
    shopId: {
      type: String,
      required: true
    }
  },
  contactDetails: {
    telephone: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    postcode: {
      type: String,
      required: true
    }
  },
  startDate: {
    type: String,
    required: true
  },
  emergencyContact: {
    name: {
      type: String,
      required: true
    },
    telephone: {
      type: String,
      required: true
    }, 
    relation: {
      type: String,
      required: true,
      enum: [ "parent", "sibling", "guardian", "friend", "collegue", "wife", "husband"]
    }
  }
})

module.exports = EmployeeSchema