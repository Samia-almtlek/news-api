const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];  // Extract the token from the Authorization header
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized, token is missing' });
    }

    try {
        const decoded = jwt.verify(token, 'secretKey'); 
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized, invalid token' });
    }
};
