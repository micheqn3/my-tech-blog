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
// /api/comment/update/:id
router.put('/update/:id', withAuth, async (req, res) => {
    try {
        const data = Comment.update({
            body: req.body.body
        },  
        {
            where: {
                id: req.body.postID
            }
        })
        if (!data) {
            res.status(404).json({message: "Could not find a comment with this ID!"});
        } else {
            res.status(200).json({message: "Succesfully updated comment!"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete comment
// /api/comment/delete/:id
router.delete('/delete/:id', async (req, res) => {
    try {
        const d = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!d) {
            res.status(404).json({message: "Could not find comment with this ID!"});
        } else {
            res.status(200).json({message: "Comment deleted!"});
        }

    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;