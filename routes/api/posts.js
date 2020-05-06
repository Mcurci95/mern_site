const express = require('express');
const router = express.Router();

// @route   GET api/posts
// @desc    Test route 
// @access  Public
router.get('/', (req, res) => res.send('Posts route'));


router.get('/all', (req, res) => {
    res.json({posts: "all_posts"});
});


router.delete('/post', (req,res) => {
    res.json({post: "post_id"});
});
module.exports = router;