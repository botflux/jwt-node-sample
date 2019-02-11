const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.get('TOKEN') || ''

    if (!(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(token) && jwt.verify(token, 'APPLICATION_SECRET_PASSWORD'))) {
        return res
            .redirect('/')
    } else {
        next()
    }
}