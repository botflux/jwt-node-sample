const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const jwt = require('jsonwebtoken')
const userUtils = require('./userUtils')
const jwtCheckMiddleware = require('./jwt-check-middleware')

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

app.post('/login', (req, res) => {
    
    const { username, password } = req.body

    if (!req.areUserData) {
        return res
            .sendStatus(404)
            .send('Please pass data for login')
    }

    userUtils.checkCredentials({ username, password })
        .then(user => {
            const token = jwt.sign(user, 'APPLICATION_SECRET_PASSWORD')
            return res.send(token)
        }, reason => {
            console.log('Rejected', reason)
            return res.send(reason)
        })
        .catch(e => {
            console.log('Error', e)
            return res.send(e)
        })
})

app.route('/admin')
    .all(jwtCheckMiddleware)
    .get((req, res) => {
        return res.send(`
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1>Admin area</h1>
                </body>
            </html>
        `)
    })

module.exports = app