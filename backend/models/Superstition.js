const mongoose = require('mongoose');

const superstitionSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    description: {
        type: String,
        required: true
    },
    proof: {
        type: String,
        trim: true,
        required: true
    },
    correctness_status: {
        type: String,
        enum: ['pending', 'rejected', 'approved'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Superstition', superstitionSchema);