const mongoose = require('mongoose');

const staticContentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('StaticContent', staticContentSchema); 