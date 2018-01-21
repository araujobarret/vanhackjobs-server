const mongoose = require('mongoose');

let locationSchema = mongoose.Schema({
  city: {
    type: String,
    trim: true,
    required: true
  },
  country: {
    type: String,
    trim: true,
    required: true
  }
});

let jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  location: locationSchema,
  skills: [
    {
      type: String,
      trim: true
    }
  ],
  date: {
    type: String,
    trim: true,
    required: true
  }
});

let Job = mongoose.model('Job', jobSchema);

module.exports = { Job };
