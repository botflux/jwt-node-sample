const app = require('./src/app')
const APPLICATION_PORT = process.env.PORT || 3000

app.listen(APPLICATION_PORT, () => console.log(`Application is now listening on port ${APPLICATION_PORT}.`))