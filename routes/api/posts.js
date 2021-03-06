const express = require('express');
const router = express.Router();

const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

router.post("/", [ auth, [
    check('text', 'Text is required.').not().isEmpty()
    ]
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newPost = {
            text
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
    const user = await User.findById(req.user.id).select('-password');

    }
);

router.get("/", (req, res) => {
    // Grab every post
    const posts = [];
    res.json({posts: posts});
});


router.get("/:postid", (req, res) => {
    const post = req.params.postid;
    res.json({post: "Posts from " + post});
} );


router.delete("/:postid", (req,res) => {
    res.json({msg: `Deleted post ID: ${req.params.postid}`});
})

module.exports = router;