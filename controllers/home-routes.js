const router = require('express').Router();
const Post = require('../models/Post');

// / routes 

// Gets all posts from the db and shows on home page
router.get('/', async (req, res) => {
    try {
        const data = await Post.findAll();
        const posts = data.map((item) => item.get({ plain: true })); // Iterates over each array item to get plain object instead of sequelize object
        res.render('home', {
            posts,
            loggedIn: req.session.loggedIn
        })
    } catch (error) {
        res.status(500).json(error);
    }
})

// Goes to the log in screen 
router.get('/login', (req, res) => {
    res.render('login');
})

// Goes to the sign up screen
router.get('/signup', (req, res) => {
    res.render('signup');
})

// Goes to the dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

module.exports = router;