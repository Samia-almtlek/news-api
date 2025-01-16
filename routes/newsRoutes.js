const express = require('express');
const router = express.Router();
const NewsController = require('../controllers/newsController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, NewsController.createNews); // Add a new news item (protected)
router.put('/:id', protect, NewsController.updateNews); // Update a news item (protected)
router.delete('/:id', protect, NewsController.deleteNews); // Delete a news item (protected)


// Pagination Route
router.get('/paginated', NewsController.getPaginatedNews);

//Search news
router.get('/search', NewsController.searchNews);

//Sorting by category
router.get('/sorted-by-category', NewsController.getSortedNewsByCategory);


// CRUD Routes
router.post('/', NewsController.createNews);    // Create News
router.get('/', NewsController.getNews);        // Get All News
router.get('/:id', NewsController.getNewsById); // Get News By ID
router.put('/:id', NewsController.updateNews);  // Update News
router.delete('/:id', NewsController.deleteNews); // Delete News



module.exports = router;
