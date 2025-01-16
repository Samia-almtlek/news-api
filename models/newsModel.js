const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'], 
        minlength: [5, 'Title must be at least 5 characters long'], 
        maxlength: [100, 'Title cannot exceed 100 characters'], 
    },
    description: {
        type: String,
        required: [true, 'Description is required'], 
        minlength: [20, 'Description must be at least 20 characters long'], 
    },
    author: {
        type: String,
        required: [true, 'Author is required'], 
        validate: {
            validator: function (value) {
                return /^[a-zA-Z\s]+$/.test(value); 
            },
            message: 'Author must only contain letters',
        },
    },
   
    category: {
        type: String,
        enum: ['Politics', 'Sports', 'Technology', 'Health', 'Entertainment'],
        required: [true, 'Category is required'], 
    },
    start_date: {
        type: Date,
        required: [true, 'Start date is required'],
    },
    end_date: {
        type: Date,
        required: [true, 'End date is required'],
        validate: {
            validator: function (value) {
                return value > this.start_date; 
            },
            message: 'End date must be after start date',
        },
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date to the current date
    },
    
});

module.exports = mongoose.model('News', NewsSchema);
