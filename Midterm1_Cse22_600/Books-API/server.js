const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory array to store books
let books = [];
let nextId = 1;

// 1. POST /api/books - Add a new book
app.post('/api/books', (req, res) => {
  const { title, author, year } = req.body;

  // Missing data -> 400
  if (!title || !author || year === undefined) {
    return res.status(400).json({ message: 'Title, author, and year are required' });
  }

  // Same name twice -> 409
  const duplicate = books.find(
    (b) => b.title.toLowerCase() === title.trim().toLowerCase()
  );
  if (duplicate) {
    return res.status(409).json({ message: 'A book with this title already exists' });
  }

  const newBook = {
    id: nextId++,
    title: title.trim(),
    author: author.trim(),
    year: Number(year),
  };

  books.push(newBook);
  res.status(201).json(newBook); // New added -> 201
});

// 2. GET /api/books - Get all books (with optional ?author= filter)
app.get('/api/books', (req, res) => {
  const { author } = req.query;

  if (author) {
    const filteredBooks = books.filter((b) =>
      b.author.toLowerCase().includes(author.toLowerCase())
    );
    return res.status(200).json(filteredBooks);
  }

  res.status(200).json(books);
});

// 3. GET /api/books/:id - Get a single book by ID
app.get('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' }); // Wrong id -> 404
  }

  res.status(200).json(book);
});

// 4. PUT /api/books/:id - Update a book by ID
app.put('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' }); // Wrong id -> 404
  }

  const { title, author, year } = req.body;

  // Missing data -> 400
  if (!title || !author || year === undefined) {
    return res.status(400).json({ message: 'Title, author, and year are required' });
  }

  // Same name twice on a different book -> 409
  const duplicate = books.find(
    (b) => b.id !== id && b.title.toLowerCase() === title.trim().toLowerCase()
  );
  if (duplicate) {
    return res.status(409).json({ message: 'Another book with this title already exists' });
  }

  book.title = title.trim();
  book.author = author.trim();
  book.year = Number(year);

  res.status(200).json(book);
});

// 5. DELETE /api/books/:id - Delete a book by ID
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' }); // Wrong id -> 404
  }

  const deletedBook = books.splice(index, 1);
  res.status(200).json({ message: 'Book deleted', book: deletedBook[0] });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
