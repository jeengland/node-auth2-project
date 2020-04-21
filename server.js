const express = require('express');
const server = express();
const bcrypt = require('bcryptjs');
const cors = require('cors');

const Auth = require('./server-helpers.js');

require('dotenv').config();

server.use(express.json());
server.use(cors({ credentials: true, origin: "http://localhost:3000" }));

server.get('/api/users', (req, res) => {
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

module.exports = server;