const express = require('express')
const router = express.Router()

const {
  getUsers,
  addUser,
  deleteUser,
  getUserById,
} = require('../controllers/usersController')

router.get('/', getUsers)
router.post('/create', addUser)
router.route('/user/:id').get(getUserById).delete(deleteUser)

module.exports = router
