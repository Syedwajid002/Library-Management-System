const Borrow = require('../models/Borrow');
const Book = require('../models/Book');

// Borrow a book (Member only)
exports.borrowBook = async (req, res) => {
  try {
    const { ISBN } = req.body;
    const userId = req.user.userId;

    // Find the book document by ISBN
    const book = await Book.findOne({ ISBN: ISBN });

    if (!book || book.copies < 1) {
      return res.status(400).json({ message: 'Book not available' });
    }

    // Decrement book copies
    book.copies -= 1;
    await book.save();

    // Save the borrow record with book's ObjectId, not ISBN
    const borrow = new Borrow({ user: userId, book: book._id });
    await borrow.save();

    res.status(201).json(borrow);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Return a borrowed book (Member only)
exports.returnBook = async (req, res) => {
  try {
    const borrowId = req.params.id;
    const userId = req.user.userId;

    const borrow = await Borrow.findOne({ _id: borrowId, user: userId, status: 'borrowed' }).populate('book');
    if (!borrow) {
      return res.status(404).json({ message: 'Active borrow record not found' });
    }

    // Update book copies
    const book = await Book.findById(borrow.book._id);
    book.copies += 1;
    await book.save();

    // Mark as returned
    borrow.status = 'returned';
    borrow.returnDate = new Date();
    await borrow.save();

    res.json({ message: 'Book returned successfully', borrow });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user's borrow history
exports.getBorrowHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const history = await Borrow.find({ user: userId })
      .populate('book')
      .sort({ borrowDate: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
