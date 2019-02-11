module.exports = (req, res, next) => {
    const { username, password } = req.body

    if (username !== undefined && password !== undefined) {
        req.areUserData = true
    }

    next()
}