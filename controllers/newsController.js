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
        // إعداد البيانات لتحديثها
        const updatedData = {
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            category: req.body.category, // تأكد من معالجة category
        };
        const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!news) return res.status(404).json({ message: 'News not found' });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
        const limit = parseInt(req.query.limit) || 10; // عدد النتائج في الصفحة
        const offset = parseInt(req.query.offset) || 0; // تجاوز عدد معين من السجلات

        const news = await News.find()
            .skip(offset) // تجاوز عدد معين من السجلات
            .limit(limit); // تحديد عدد النتائج لكل صفحة

        const total = await News.countDocuments(); // إجمالي عدد السجلات

        res.status(200).json({
            total, // إجمالي الأخبار
            count: news.length, // عدد الأخبار المرسلة
            news, // الأخبار
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//Search 
exports.searchNews = async (req, res) => {
    try {
        const { title, author } = req.query;
        const query = {};

        if (title) query.title = { $regex: title, $options: 'i' }; // البحث في العنوان
        if (author) query.author = { $regex: author, $options: 'i' }; // البحث في المؤلف

        const news = await News.find(query);
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
