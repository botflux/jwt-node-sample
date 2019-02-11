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
const checkCredentials = ({ username = '', password = '' }) => {
    return new Promise((res, rej) => {
        getUsers() 
        .then(users => {
            const user = users.find(u => u.username === username && u.password === password)
            if (!user) {
                rej('Bad credentials')
            } else {
                res(user)
            }
        })
    }) 
}

module.exports = {
    getUsers,
    checkCredentials,
}