const router = require('express').Router();
const Comment = require('../../models/Post'); 
const withAuth = require('../../utils/auth')

//  api/comment route

// Add comment
router.post('/', async (req, res) => {
    try {
        const d = await Comment.create({
            body: req.body.body,
            user_id: req.session.userID,
            post_id: req.body.postID
        })
        console.log(d);// testing
        res.status(200).json({message: "Comment created!"});
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;