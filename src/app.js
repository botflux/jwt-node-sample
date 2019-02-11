const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const jwt = require('jsonwebtoken')
const userUtils = require('./userUtils')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const userDataMiddleware = (req, res, next) => {
    const { username, password } = req.body

    if (username !== undefined && password !== undefined) {
        req.areUserData = true
    }

    next()
}

app.use(userDataMiddleware)

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.post('/login', async (req, res) => {
    
    const { username, password } = req.body

    if (!req.areUserData) {
        return res
            .sendStatus(404)
            .send('Please pass data for login')
    }

    const validCredentials = userUtils.checkCredentials({
        username,
        password
    }).catch(e => {
        return res.sendStatus(500).send('Something went wrong')
    })

    if (!validCredentials) return res.sendStatus(403).send('Bad credentials.')

    userUtils.getUser(username)
        .then(user => {
            const token = jwt.sign(user, 'APPLICATION_SECRET_PASSWORD')
            return res.send(token)
        })
        .catch(e => {
            return res
                .sendStatus(500)
                .send(e)
        })
})

module.exports = app