const db = require('./data/db-config.js');

module.exports = {
    getUsers,
    addUser,
    findUser,
}

function addUser(user) {
    return db('users')
            .insert(user)
}

function findUser(username) {
    return db('users')
            .where({ username })
            .first()
}

function getUsers() {
    return db('users')
}