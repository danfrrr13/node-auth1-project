const bc = require('bcryptjs');

const router = require('express').Router();

const Users = require('../users/users-model.js');

// router.get('/users', (req, res, next) => {
    
//     if(req.headers.authorization) {
//         bc.hash(req.headers.authorization, 10, (err, hash) => {
//             if (err) {
//                 console.log('error getting users', err)
//                 res.status(500).json({ errorMessage: 'What happened?' })
//             } else {
//                 Users.getUsers()
//                     .then(users => {
//                         res.status(200).json(users)
//                     })
//                     .catch(err => {
//                         console.log('could not get users', err)
//                         res.status(500).json({ errorMessage: 'Could not retreive users' })
//                     })
//             }
//         })
//     } else {
//         res.status(400).json({ errorMessage: 'Please provide credentials' })
//     }
    
// })

//creates a new user with a username and password
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
                req.session.username = username;
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

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ message: 'Unable to logout' })
            } else {
                res.status(200).json({ message: 'Come back anytime!' })
            }
        })
    } else {
        res.status(200).json({ message: 'not sure how you got here without loggin in first' })
    }
})

module.exports = router;