const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  days: {
    type: Number,
    required: true,
    min: 1
  },
  companions: {
    type: String,
    required: true,
    enum: ['Solo', 'Family', 'Friends']
  },
  budget: {
    type: Number,
    required: true,
    min: 0
  },
  itinerary: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Trip', tripSchema); 