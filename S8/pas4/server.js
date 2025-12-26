const express = require('express')
const app = express()
const port = 3000

class Book {
  constructor(id, name, genre, author) {
    this.id = id
    this.name = name
    this.genre = genre
    this.author = author
  }
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let books = [
  new Book(1, 'Dune', 'sf', 'Frank Herbert'),
  new Book(2, 'Robinson Crusoe', 'adventure', 'Daniel Defoe'),
  new Book(3, 'Foundation', 'sf', 'Asimov')
]

app.get('/', (req, res) => {
  res.send('Welcome to my API')
})

app.get('/api/books', (req, res) => {
  let result = books

  if (req.query.genre) {
    result = result.filter(book => book.genre === req.query.genre)
  }

  res.json(result)
})

app.post('/api/books', (req, res) => {
  const { id, name, genre, author } = req.body

  if (!id || !name || !genre || !author) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  if (books.find(b => b.id === Number(id))) {
    return res.status(400).json({ error: 'Book with this id already exists' })
  }

  const newBook = new Book(Number(id), name, genre, author)
  books.push(newBook)

  res.status(201).json(newBook)
})

app.put('/api/books/:bookId', (req, res) => {
  const bookId = Number(req.params.bookId)
  const book = books.find(b => b.id === bookId)

  if (!book) {
    return res.status(404).json({ error: 'Book not found' })
  }

  const { name, genre, author } = req.body

  if (name) book.name = name
  if (genre) book.genre = genre
  if (author) book.author = author

  res.json(book)
})

app.delete('/api/books/:bookId', (req, res) => {
  const bookId = Number(req.params.bookId)
  const index = books.findIndex(b => b.id === bookId)

  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' })
  }

  const deletedBook = books.splice(index, 1)
  res.json(deletedBook[0])
})

app.listen(port, () => {
  console.log('Running on port ' + port)
})
