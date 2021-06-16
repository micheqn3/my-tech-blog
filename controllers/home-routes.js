const router = require('express').Router();
const {Post, User, Comment} = require('../models/');

// / routes 

// Gets all posts from the db and shows on home page
router.get('/', async (req, res) => {
    try {
        const data = await Post.findAll({
            attributes: ["id", "title", "body", "user_id", "updated_at"],
            include: [
              {
                model: User,
                as: "user",
                attributes: ["userName"],
              },
              {
                model: Comment,
                as: "comments",
                attributes: ["id", "body", 'updated_at'],
              },
            ],
        })
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
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

// Goes to the sign up screen
router.get('/signup', (req, res) => {
    res.render('signup');
})

// Gets a post 

// Gets a comment


module.exports = router;