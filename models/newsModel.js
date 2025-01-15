const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'], // التحقق من وجود العنوان
        minlength: [5, 'Title must be at least 5 characters long'], // الحد الأدنى لطول العنوان
        maxlength: [100, 'Title cannot exceed 100 characters'], // الحد الأقصى لطول العنوان
    },
    description: {
        type: String,
        required: [true, 'Description is required'], // التحقق من وجود الوصف
        minlength: [20, 'Description must be at least 20 characters long'], // الحد الأدنى لطول الوصف
    },
    author: {
        type: String,
        required: [true, 'Author is required'], // التحقق من وجود اسم المؤلف
        validate: {
            validator: function (value) {
                return /^[a-zA-Z\s]+$/.test(value); // التحقق من أن اسم المؤلف يحتوي فقط على الحروف
            },
            message: 'Author must only contain letters',
        },
    },
   
    category: {
        type: String,
        enum: ['Politics', 'Sports', 'Technology', 'Health', 'Entertainment'],
        required: [true, 'Category is required'], // التحقق من وجود التصنيف
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('News', NewsSchema);
