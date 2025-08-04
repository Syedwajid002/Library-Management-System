const Borrow = require('../models/Borrow');
const Book = require('../models/Book');

exports.mostBorrowedBooks = async (req, res) => {
  try {
    const results = await Borrow.aggregate([
      { $group: { _id: "$book", borrowCount: { $sum: 1 } } },
      { $sort: { borrowCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book"
        }
      },
      { $unwind: "$book" },
      {
        $project: {
          _id: 0,
          bookId: "$book._id",
          title: "$book.title",
          author: "$book.author",
          ISBN: "$book.ISBN",
          borrowCount: 1
        }
      }
    ]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// {ActiveMembers from lib}
exports.activeMembers = async (req, res) => {
  try {
    const results = await Borrow.aggregate([
      { $group: { _id: "$user", borrowCount: { $sum: 1 } } },
      { $sort: { borrowCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          name: "$user.name",
          email: "$user.email",
          borrowCount: 1
        }
      }
    ]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//total no of books available and borr0wed
exports.bookAvailability = async (req, res) => {
  try {
    const totalBooksData = await Book.aggregate([{ $group: { _id: null, total: { $sum: "$copies" } } }]);
    const totalBooks = totalBooksData[0]?.total || 0;

    const borrowedBooks = await Borrow.countDocuments({ status: 'borrowed' });

    const availableBooks = totalBooks - borrowedBooks;

    res.json({
      totalBooks,
      borrowedBooks,
      availableBooks
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
