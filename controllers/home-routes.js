const router = require('express').Router();
const {Post, User, Comment} = require('../models/');
const withAuth = require('.././utils/auth');

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
                attributes: ["id", "body", 'updated_at']
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

// Shows individual post 
router.get('/post/:id', async (req, res) => {
    try {
        const d = await Post.findOne({ // Find all posts where the ID is equal to the req.body.id
            where: {
                id: req.params.id
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
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ["userName"] // Adding this to be able to access userName in view-comments-partials
                    }
                ]
              },
            ],
        })
        if (!d) {
            res.status(404).json({ message: 'There are no posts found with this ID!' });
        } else {
            const data = d.get({plain: true}); // Will show post to the user. If the user is logged in, will show comment box
            console.log(data); // testing
            res.render('view-post', {
                data,
                loggedIn: req.session.loggedIn
            })
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

// Route from clicking on 'comment' from the post. Needs authorization to comment
router.get('/comment/:id', withAuth, async (req, res) => {
    try {
        const d = await Post.findOne({ 
            where: {
                id: req.params.id
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
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ["userName"] 
                    }
                ]
              },
            ],
        })
        if (!d) {
            res.status(404).json({ message: 'There are no posts found with this ID!' });
        } else {
            const data = d.get({plain: true}); // Will show post to the user
            res.render('view-post', {
                data,
                loggedIn: req.session.loggedIn
            })
        }
    } catch (error) {
        res.status(500).json(error);
    }
})


router.get('/comment/get/:id', withAuth, async (req, res) => {
    try {
        const d = await Comment.findOne({ 
            where: {
                id: req.params.id
            },
            // attributes: ["id", "title", "body", "user_id", "updated_at"],
            include: [
              {
                model: User,
                as: "user",
                attributes: ["userName"],
              },
            ],
        })
        if (!d) {
            res.status(404).json({ message: 'There are no posts found with this ID!' });
        } else {
            const data = d.get({plain: true}); // Will show comment to the user
            res.render('view-comment', {
                data,
                loggedIn: req.session.loggedIn
            })
        }
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;