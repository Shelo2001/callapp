const express = require('express')
const app = express()

const usersRoutes = require('./routes/usersRoutes')
app.use(express.json())

app.use('/api/users', usersRoutes)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
