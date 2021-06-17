const router = require('express').Router();
const Comment = require('../../models/Comment'); 
const withAuth = require('../../utils/auth')

//  api/comment route

// Route to get all comments
router.get('/', async (req, res) => {
    try {
        const d = await Comment.findAll();
        res.status(200).json(d)
    } catch(error) {
        res.status(500).json(error);
    }
})

// Route

// Add comment
router.post('/', withAuth, async (req, res) => {
    try {
        const d = await Comment.create({
            body: req.body.body,
            user_id: req.session.userID,
            post_id: req.body.postID
        })
        res.status(200).json({message: "Comment created!"});
    } catch (error) {
        res.status(500).json(error);
    }
})

// Update comment

// Delete comment


module.exports = router;