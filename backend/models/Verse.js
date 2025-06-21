const mongoose = require('mongoose');

const verseSchema = mongoose.Schema({
   chapter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      required: true
   },
   verse_no: {
      type: Number,
      required: true,
   },
   sanskrit_script: {
      type: String,
      required: true,
      trim: true,
   },
   hindi_translation: {
      type: String,
      trim: true
   },
   english_translation: {
      type: String,
      trim: true
   },
   interpretation: {
      type: String,
      trim: true
   },
   audio: {
      data: Buffer,
      contentType: String,
   },
   video: {
      type: String,
      trim: true
   },
   keywords: {
      type: [String],
      default: []
   },
   who_tell: {
      type: String,
      default: "author"
   },
   whome_to_tell: {
      type: String,
      default: "Humanity"
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
});

module.exports = mongoose.model('Verse', verseSchema);