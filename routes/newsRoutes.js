const express = require('express');
const router = express.Router();
const NewsController = require('../controllers/newsController');

// Pagination Route
router.get('/paginated', NewsController.getPaginatedNews);

// CRUD Routes
router.post('/', NewsController.createNews);    // Create News
router.get('/', NewsController.getNews);        // Get All News
router.get('/:id', NewsController.getNewsById); // Get News By ID
router.put('/:id', NewsController.updateNews);  // Update News
router.delete('/:id', NewsController.deleteNews); // Delete News



module.exports = router;
