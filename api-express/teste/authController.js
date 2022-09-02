const express = require('express');
const User =  require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        if (await User.findOne({email})) 
            return res.status(400).send({error: 'User already exists'} );

        const user = await User.create(req.body);

        user.password = undefined;
        
        return res.send({User});        
    } catch (err) {
        return res.status(400).send({error: 'Registration failed'});
    }
});

module.exports = app => app.use('/auth', router);