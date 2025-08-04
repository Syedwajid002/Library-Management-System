const Book = require('../models/Book');

// Adding new book by admin 
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

// Updating book details by admin
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

// Deleting book By admin
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

//getaAllBooks by admin
exports.listBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

