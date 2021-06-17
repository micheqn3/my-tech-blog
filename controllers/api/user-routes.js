const router = require('express').Router();
const User = require("../../models/User");

// /api/user routes 

// Route to get all users
router.get('/', async (req, res) => {
    try {
        const d = await User.findAll({
            attributes: { exclude: ['password'] },
        }
        );
        res.status(200).json(d)
    } catch(error) {
        res.status(500).json(error)
    }
})

// Create a new user 
router.post('/', async (req, res) => {
    try {
        const d = await User.create({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        });
        req.session.save(() => { // Sets req.session variable loggedIn to true and userID to the User model's ID
            req.session.loggedIn = true;
            req.session.userID = d.id;
            res.status(200).json(d);
        })
    } catch (error) {
        res.status(500).json(error);
    }
})

// Log in 
router.post('/login', async (req, res) => {
    try {
        const d = await User.findOne({
            where: {
                userName: req.body.userName
            }
        })
        if (!d) {
            res.status(400).json({message: "Incorrect email or password."});
        } else {
            const validPassword = await d.checkPassword(req.body.password);
            if (!validPassword) {
                res.status(400).json({message: "Incorrect password"})
            } else {
                req.session.save(() => {
                    req.session.loggedIn = true;
                    req.session.userID = d.id;
                    res.status(200).json({message: "Successful log in!"});
                })
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

// Log out
router.post('/logout', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(204).end();
            })
        } else {
            res.status(404).end();
        }
    } catch (error) {
        res.status(500).json({message: "Something went wrong."});
    }
})

module.exports = router;