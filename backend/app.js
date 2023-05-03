const express = require('express')
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
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/users', usersRoutes)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

router.get('/', getUsers)
router.post('/create', addUser)
router
  .route('/user/:id')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUser)

app.use('/.netlify/functions/app', router)

module.exports = app
module.exports.handler = serverless(app)
