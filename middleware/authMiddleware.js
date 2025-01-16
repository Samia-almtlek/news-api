const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // استخراج الرمز من الهيدر
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized, token is missing' });
    }

    try {
        const decoded = jwt.verify(token, 'secretKey'); // التحقق من صحة الرمز
        req.user = decoded; // إضافة بيانات المستخدم إلى الطلب
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized, invalid token' });
    }
};
