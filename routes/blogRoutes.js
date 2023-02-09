const express = require('express');
const router = express.Router();

// Blog Controller
const blogController = require('../controllers/blogController');

router.get('/', blogController.get_blogs);

router.post('/', blogController.post_blog);

router.get('/:id', blogController.get_blog);

router.delete('/:id', blogController.delete_blog);

router.get('/update/:id', blogController.get_blog_to_update);

router.put('/update/:id', blogController.update_blog);

module.exports = router;