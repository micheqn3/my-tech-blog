const router = require('express').Router();
const Post = require('../../models/Post'); 
const withAuth = require('../../utils/auth')

// /api/post routes

// Create new post 

router.post('/', async (req, res) => {
    try {
        const d = await Post.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.session.userID
        })
        res.status(200).json({message: "Post created!"});
    } catch (error) {
        res.status(500).json(error);
    }
})

// Delete post 

// Update post

module.exports = router;