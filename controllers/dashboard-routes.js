const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('.././utils/auth')

// /dash routes

// Goes to the create post screen
// /dash/create
router.get('/create', withAuth, (req, res) => {
    res.render('create-post', {
        loggedIn: req.session.loggedIn
    });
})

// Gets all user posts 
// /dash
router.get('/', withAuth, async (req, res) => {
    try {
        const data = await User.findAll({
            where: {
                id: req.session.userID
            },
            include: [
                {
                    model: Post,
                    attributes: ["id", "title", "body", "updated_at"],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ["userName"] // Adding this to be able to access userName in view-my-posts-partial
                        }
                    ]
                },
                {
                    model: Comment,
                    attributes: ["id", "body", "updated_at"],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ["userName"] // Adding this to be able to access userName in view-my-comments-partial
                        }
                    ]
                }
            ],
        })
        const posts = data.map((item) => item.get({ plain: true })); // Iterates over each array item to get plain object instead of sequelize object
        res.render('dashboard', {
            loggedIn: req.session.loggedIn,
            posts,
        })
        console.log(posts) // testing
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;