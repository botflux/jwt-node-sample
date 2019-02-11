const userUtils = require('./userUtils')

userUtils.checkCredentials({
    username: 'John',
    password: 'j0hn'
})
.then(res => {
    console.log('result', res)
})

userUtils.getUser('John')
    .then(user => {
        console.log(user)
    })