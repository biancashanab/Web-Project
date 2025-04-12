const mongoose = require('mongoose');

const petCareGuideSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  bgColor: {
    type: String,
    required: true
  },
  iconBgColor: {
    type: String,
    required: true
  },
  items: [{
    type: String,
    required: true
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('PetCareGuide', petCareGuideSchema); 