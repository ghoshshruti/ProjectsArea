const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for frontend connection
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// In-memory storage for books
let books = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 2, title: "1984", author: "George Orwell" },
  { id: 3, title: "Pride and Prejudice", author: "Jane Austen" }
];

// Helper function to generate new ID
const generateId = () => {
  return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
};

// Helper function to find book by ID
const findBookById = (id) => {
  return books.find(book => book.id === parseInt(id));
};

// GET /books - Get all books
app.get('/books', (req, res) => {
  res.json({
    success: true,
    count: books.length,
    data: books
  });
});

// GET /books/:id - Get a specific book by ID
app.get('/books/:id', (req, res) => {
  const book = findBookById(req.params.id);
  
  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  res.json({
    success: true,
    data: book
  });
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  
  // Validation
  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: 'Title and author are required'
    });
  }
  
  const newBook = {
    id: generateId(),
    title: title.trim(),
    author: author.trim()
  };
  
  books.push(newBook);
  
  res.status(201).json({
    success: true,
    message: 'Book created successfully',
    data: newBook
  });
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
  const book = findBookById(req.params.id);
  
  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  const { title, author } = req.body;
  
  // Validation
  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: 'Title and author are required'
    });
  }
  
  // Update the book
  book.title = title.trim();
  book.author = author.trim();
  
  res.json({
    success: true,
    message: 'Book updated successfully',
    data: book
  });
});

// DELETE /books/:id - Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));
  
  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  const deletedBook = books.splice(bookIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'Book deleted successfully',
    data: deletedBook
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`📚 Books API Server running on http://localhost:${PORT}`);
  console.log(`📖 Available endpoints:`);
  console.log(`   GET    /books      - Get all books`);
  console.log(`   GET    /books/:id  - Get book by ID`);
  console.log(`   POST   /books      - Create new book`);
  console.log(`   PUT    /books/:id  - Update book by ID`);
  console.log(`   DELETE /books/:id  - Delete book by ID`);
});

module.exports = app;