const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('.././utils/auth')

// /dash routes

// Goes to the create post screen
router.get('/create', (req, res) => {
    res.render('create-post', {
        loggedIn: req.session.loggedIn
    });
})

// Gets all user posts 
router.get('/', withAuth, async (req, res) => {
    try {
        const data = await Post.findAll({
            where: {
                user_id: req.session.userID
            },
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
        res.render('dashboard', {
            loggedIn: true,
            posts,
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// Edit one user post

module.exports = router;