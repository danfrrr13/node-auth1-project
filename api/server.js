const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const ApiRouter = require('./api-router.js');

const dbCon = require('../data/db-config.js');

const server = express();

const sessionConfiguration = {
    name: 'sessionTesting',
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 5,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({ 
        knex: dbCon,
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 6000
    })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfiguration))

server.get('/', (req, res) => {
    res.send('<h2>API with Auth</h2>')
});

server.use('/api', ApiRouter);

module.exports = server;