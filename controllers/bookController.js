const Book = require('../models/Book');

// Add a new book (Admin only)
exports.addBook = async (req, res) => {
  try {
    const { title, author, ISBN, publicationDate, genre, copies } = req.body;
    console.log(title)
    const book = new Book({ title, author, ISBN, publicationDate, genre, copies });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error('Add Book Error:', err);
    res.status(400).json({ message: err.message });
  }
};

// Update book details (Admin only)
exports.updateBook = async (req, res) => {
  try {
    // console.log("first")
    const book = await Book.findOneAndUpdate(
      { ISBN: req.params.ISBN },  // Match by ISBN
      req.body,
      { new: true, runValidators: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a book (Admin only)
exports.deleteBook = async (req, res) => {
  try {
    // console.log("first")
    const book = await Book.findOneAndDelete({ISBN:req.params.ISBN});
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// List and filter books
// exports.listBooks = async (req, res) => {
//   try {
//     const { genre, author, page = 1, limit = 10 } = req.query;
//     const filter = {};
//     if (genre) filter.genre = genre;
//     if (author) filter.author = author;

//     const books = await Book.find(filter)
//       .skip((page - 1) * limit)
//       .limit(Number(limit));
//     res.json(books);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.listBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

