const express = require('express')
const app = express()
const serverless = require('serverless-http')
const usersRoutes = require('./routes/usersRoutes')
const router = require('./routes/usersRoutes')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/users', usersRoutes)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

app.use('/.netlify/functions/app', router)

module.exports.handler = serverless(app)
