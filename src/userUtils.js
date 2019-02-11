const fs = require('fs')
const util = require('util')

/**
 * Returns database users
 */
const getUsers = () => {
    return util.promisify(fs.readFile)('db.json', 'utf8')
        .then(data => JSON.parse(data))
        .then(obj => obj.users)
}

/**
 * Check if crendentails are valid
 * 
 * @param {{}} credentials Credentials
 */
const checkCredentials = async ({ username = '', password = '' }) => {
    const users = await getUsers()
    return (users.find(u => u.username === username && u.password === password) !== undefined)
}

/**
 * Returns a user from his username
 * 
 * @param {String} username Username
 */
const getUser = async (username = '') => {
    const users = await getUsers()

    return users.find(u => u.username === username)
}

module.exports = {
    getUsers,
    checkCredentials,
    getUser
}