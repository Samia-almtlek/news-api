const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'], 
        validate: {
            validator: function (value) {
                return /^[a-zA-Z\s]+$/.test(value); 
            },
            message: 'Name must only contain letters',
        },
    },
    email: {
        type: String,
        required: [true, 'Email is required'], 
        match: [/.+@.+\..+/, 'Email must be valid'], 
    },
    
    password: {
        type: String,
        required: [true, 'Password is required'], 
        minlength: [6, 'Password must be at least 6 characters'], 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);
