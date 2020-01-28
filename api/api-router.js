const router = require('express').Router();

const AuthRouter = require('../auth/auth-router.js');

const UserRouter = require('../users/users-router.js');

router.use('/auth', AuthRouter);
router.use('/users', UserRouter);

module.exports = router;