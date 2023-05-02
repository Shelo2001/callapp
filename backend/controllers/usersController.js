const fs = require('fs')

// get all users
const getUsers = async (req, res) => {
  fs.readFile('data.json', (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(JSON.parse(data))
    }
  })
}

const addUser = async (req, res) => {
  let data = JSON.parse(fs.readFileSync('data.json'))
  const { name, email, gender, address, phone } = req.body
  const id = data[data.length - 1].id + 1
  const newUser = {
    id,
    name,
    email,
    gender,
    address,
    phone,
  }

  data.push(newUser)

  fs.writeFileSync('data.json', JSON.stringify(data))

  res.json(newUser)
}

const deleteUser = async (req, res) => {
  const id = req.params.id
  fs.readFile('data.json', 'utf8', (err, data) => {
    let users = JSON.parse(data)
    const index = users.findIndex((user) => user.id == id)
    users.splice(index, 1)
    fs.writeFile('data.json', JSON.stringify(users, null, 2), 'utf8', (err) => {
      if (err) {
        console.log(err)
        res.status(500).send('Internal server error')
        return
      }
      res.send(`user deleted successfully`)
    })
  })
}

module.exports = { getUsers, addUser, deleteUser }
