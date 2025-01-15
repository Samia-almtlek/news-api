const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});


// Database Connection
mongoose.connect(dbConfig.mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Database connection error:', err));

    // Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/news', require('./routes/newsRoutes'));




// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


