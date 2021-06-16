const router = require('express').Router();
const Post = require('../../models/Post'); 
const withAuth = require('../../utils/auth')

// /api/post routes

// Route to get all posts
router.get('/', async (req, res) => {
    try {
        const d = await Post.findAll();
        res.status(200).json(d)
    } catch(error) {
        res.status(500).json(error)
    }
})

// Create new post 
router.post('/', withAuth, async (req, res) => {
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
router.delete('/delete/:id', async (req, res) => {
    try {
        const d = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        if(!d) {
            res.status(404).json({message: "Could not find post with this ID!"});
        } else {
            res.status(200).json({message: "Post deleted!"});
        }

    } catch (error) {
        res.status(500).json(error)
    }
})


// Update post

module.exports = router;