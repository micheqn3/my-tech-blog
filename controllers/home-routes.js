const router = require('express').Router();
const Post = require('../models/Post');

// Home routes 
router.get('/', async (req, res) => {
    try {
        const data = await Post.findAll();
        const posts = data.map((item) => item.get({ plain: true })); // Iterates over each array item to get plain object instead of sequelize object
        res.render('home', {posts})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;