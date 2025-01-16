const News = require('../models/newsModel');

// Create News
exports.createNews = async (req, res) => {
    try {
        const news = new News(req.body);
        await news.save();
        res.status(201).json(news);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get All News
exports.getNews = async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get News By ID
exports.getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'News not found' });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update News
exports.updateNews = async (req, res) => {
    try {
        // Prepare the updated data
        const updatedData = {
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            category: req.body.category,// Ensure category is processed
        };

        // Update the news item with validation enabled

        const news = await News.findByIdAndUpdate(req.params.id, updatedData, {
            new: true, // Return the updated document
            runValidators: true, // Enforce validation during the update
        });

        if (!news) return res.status(404).json({ error: 'News not found' });

        res.status(200).json(news);
    } catch (error) {
        res.status(400).json({ error: error.message });// Respond with an error message
    }
};

// Delete News
exports.deleteNews = async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) return res.status(404).json({ message: 'News not found' });
        res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//Paginated
exports.getPaginatedNews = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10; // Number of results per page
        const offset = parseInt(req.query.offset) || 0; // Number of records to skip
        const news = await News.find()
            .skip(offset) 
            .limit(limit); 

        const total = await News.countDocuments(); // Total number of records

        res.status(200).json({
            total, 
            count: news.length, 
            news, 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//Search News
exports.searchNews = async (req, res) => {
    try {
        const { title, author,category } = req.query;
        const query = {};

        if (title) query.title = { $regex: title, $options: 'i' }; // Search by title
        if (author) query.author = { $regex: author, $options: 'i' }; // Search by author
        if (category) query.category = category; // Search by category

        const news = await News.find(query);
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Get Sorted News by Category
exports.getSortedNewsByCategory = async (req, res) => {
    try {
        const { order = 'asc' } = req.query;

        const sortOrder = order === 'desc' ? -1 : 1;

        // Fetch and sort results by category
        const news = await News.find().sort({ category: sortOrder });

        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

