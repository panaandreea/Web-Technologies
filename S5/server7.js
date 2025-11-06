let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')

let app = express()
let router = express.Router()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use('/api', router)

const array = [
  { id: 1, name: "Ionuț", age: 25 },
  { id: 2, name: "Alex", age: 18 },
  { id: 3, name: "Mihai", age: 13 },
  { id: 4, name: "Marcel", age: 12 },
  { id: 5, name: "Marius", age: 22 }
]

router.route('/getList').get((req, res) => {
  res.json(array)
})

router.route('/postList').post((req, res) => {
  const el = req.body
  el.id = array.length + 1
  array.push(el)
  res.json(el)
})

router.route('/update/:id').put((req, res) => {
  const id = parseInt(req.params.id)
  const index = array.findIndex(el => el.id === id)

  if (index === -1) {
    return res.status(404).json({ message: "Elementul nu a fost găsit" })
  }

  array[index] = { ...array[index], ...req.body }
  res.json({ message: "Element actualizat cu succes", element: array[index] })
})

router.route('/delete/:id').delete((req, res) => {
  const id = parseInt(req.params.id)
  const index = array.findIndex(el => el.id === id)

  if (index === -1) {
    return res.status(404).json({ message: "Elementul nu a fost găsit" })
  }

  const deleted = array.splice(index, 1)
  res.json({ message: "Element șters cu succes", deleted })
})

let port = 8000
app.listen(port)
console.log("API is running on port " + port)
