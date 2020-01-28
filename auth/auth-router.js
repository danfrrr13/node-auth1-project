const bc = require('bcryptjs');

const router = require('express').Router();

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bc.hashSync(req.body.password, 10);

    user.password = hash;

    Users.createUser(user)
        .then(created => {
            res.status(201).json(created)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'There was an error creating this user' })
        })
})

router.post('/login', (req, res) => {
    let {username, password} = req.body;

    Users.findBy(username)
        .then(user => {
            if (user && bc.compareSync(password, user.password)) {
                res.status(200).json({ message: `Welcome ${user.username}!` })
            } else {
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: 'There was an error loggin in' })
        })
})


module.exports = router;