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

    const user = await User.findById(req.user.id).select('-password');

    const newPost = {
        text
    }
}
)

module.exports = router;