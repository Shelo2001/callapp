const express = require('express')
const router = express.Router()

const {
  getUsers,
  addUser,
  deleteUser,
} = require('../controllers/usersController')

router.get('/', getUsers)
router.post('/create', addUser)
router.post('/delete/:id', deleteUser)

module.exports = router
