const express = require('express');
const blogController = require('../controllers/blogController');


const { requireAuth, checkUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', requireAuth, blogController.blog_create_post);
router.get('/', requireAuth, blogController.blog_get_all);
router.get('/delete/:id', requireAuth, (req, res) => res.redirect('/blogs'));
router.post('/delete/:id', requireAuth, blogController.blog_delete_post);

module.exports = router;