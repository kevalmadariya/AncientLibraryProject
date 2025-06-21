const mongoose = require('mongoose');

const chapterSchema = mongoose.Schema({
   
    chapter_no: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    scripture_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sciprture',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    keywords: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Chapter', chapterSchema);