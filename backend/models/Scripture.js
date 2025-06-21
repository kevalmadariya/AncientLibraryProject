const mongoose = require('mongoose');

const scriptureSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  author: {
    type: String,
    trim: true
  },
  no_of_chapters: {
    type: Number,
  },
  chapter_type: {
    type: String,
    trim: true,
  },
  no_of_verse: {
    type: Number,
  },
  // language: {
  //   type: [String],
  // },
  description: {
    type: String,
    required: false
  },
  keywords: {
    type: [String],
    default: [] // optional but good to have
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Scripture', scriptureSchema);
