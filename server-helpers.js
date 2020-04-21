const db = require('./data/db-config.js');

module.exports = {
    getUsers,
    getAllUsers,
    addUser,
    findUser,
    findUserById,
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

function findUserById(id) {
    return db('users')
            .where({ id })
            .first()
}

function getUsers(department) {
    return db('users')
        .where({ department })
}

function getAllUsers() {
    return db('users')
}