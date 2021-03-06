const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', 
    [
        check('name', 'Name is required')
        .not()
        .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6+ characters').isLength( {min: 6} )
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const { name, email, password } = req.body;
    try {
    // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [ {msg: 'User aready exists' }]});
        }

    // Get users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name, 
            email,
            avatar,
            password
        });

    // Encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

    // Save user to the database
        await user.save();


    // Return jsonwebtoken  
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload, 
            config.get('jwtToken'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
        } catch(err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }

        console.log(req.body);

    

    
});

router.get("/", (req, res) => {
    res.json({users: "users"});
});


router.delete("/", (req, res) => {
    res.json({users: "Deleting User"});
});


module.exports = router;