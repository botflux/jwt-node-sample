const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const jwt = require('jsonwebtoken')
const fs = require('fs')

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
    /*
    if (username === undefined || password === undefined) {
        return res.send('You need to pass all data.')
    }*/

    if (!req.areUserData) {
        return res.send('You need to pass all data.')
    }

    fs.readFile('db.json', 'utf8', (e, data) => {
        if (e) throw e

        const { users } = JSON.parse(data)
        console.log(users)
        
        const found = users.find(u => u.username === username && u.password === password)

        if (!found) {
            return res
                .sendStatus(404)
                .send('User not found.')
        } else {
            const token = jwt.sign(found, 'APPLICATION_SECRET_PASSWORD')
            return res.send(token)
        }
    })
})

module.exports = app