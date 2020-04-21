const express = require('express');
const server = express();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const session = require('express-session');

const Auth = require('./server-helpers.js');

require('dotenv').config();

const sessionConfig = {
    name: 'sesh',
    secret: process.env.SECRET,
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
}

server.use(express.json());
server.use(cors({ credentials: true, origin: "http://localhost:3000" }));
server.use(session(sessionConfig));

server.get('/api/users', checkAuth, (req, res) => {
    Auth.getUsers()
        .then((users) => {
            res.status(200).json({ data: users })
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                message: 'Unable to retrieve users.'
            })
        })
})

server.post('/api/register', (req, res) => {
    const newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password, 14);
    newUser.password = hash;
    Auth.addUser(newUser)
        .then((user) => {
            res.status(201).json({ user })
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                message: 'Unable to create new user.'
            })
        })
})

server.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    Auth.findUser(username)
        .then((user) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({
                    message: `Welcome, ${user.username}`
                })
            } else {
                res.status(401).json({
                    message: 'Invalid credentials.'
                })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                message: 'Unable to validate user.'
            })
        })
})

server.get('/api/authStatus', checkAuth, (req, res) => {
    res.status(200).json({
        message: 'Authorized'
    })
})

function checkAuth(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({
            message: 'You shall not pass!'
        })
    }
}

module.exports = server;