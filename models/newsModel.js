const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
   
    category: {
        type: String,
        enum: ['Politics', 'Sports', 'Technology', 'Health', 'Entertainment'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('News', NewsSchema);
