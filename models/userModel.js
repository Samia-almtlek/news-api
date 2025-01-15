const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'], // يجب أن يكون الاسم موجودًا
        validate: {
            validator: function (value) {
                return /^[a-zA-Z\s]+$/.test(value); // التحقق من أن الاسم لا يحتوي على أرقام
            },
            message: 'Name must only contain letters',
        },
    },
    email: {
        type: String,
        required: [true, 'Email is required'], // يجب أن يكون البريد الإلكتروني موجودًا
        unique: true,
        match: [/.+@.+\..+/, 'Email must be valid'], // التحقق من صحة البريد الإلكتروني
    },
    
    password: {
        type: String,
        required: [true, 'Password is required'], // يجب أن تكون كلمة المرور موجودة
        minlength: [6, 'Password must be at least 6 characters'], // الحد الأدنى لطول كلمة المرور
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);
