const userUtils = require('./userUtils')

userUtils.checkCredentials({ username: 'John', password: 'j0hn' })
    .then(user => {
        console.log('User', user)
    }, reason => {
        console.log('Rejected', reason)
    })
    .catch(error => console.log('Error', error))