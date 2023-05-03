const express = require('express')
const cors = require('cors')
const app = express()
const serverless = require('serverless-http')
const usersRoutes = require('./routes/usersRoutes')
const router = require('./routes/usersRoutes')
const {
  getUsers,
  addUser,
  getUserById,
  updateUserById,
  deleteUser,
} = require('./controllers/usersController')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/users', usersRoutes)

// const port = process.env.PORT || 5000

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`)
// })

router.get('/', getUsers)
router.post('/create', addUser)
router.get('/user/:id', getUserById)
router.put('/user/:id', updateUserById)
router.delete('/user/:id', deleteUser)

app.use('/.netlify/functions/app', router)

module.exports = app
module.exports.handler = serverless(app)
