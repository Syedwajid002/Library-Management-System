const express = require('express');
const{addBook, updateBook, deleteBook, listBooks} = require('../controllers/bookController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// const { authenticate, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

// Admin-only routes
router.post('/addBook',authenticate, authorize('Admin'),  addBook); //https://localhost:3000/api/books/addBook
router.put('/update/:ISBN',authenticate, authorize('Admin'),  updateBook); //https://localhost:3000/api/books/:id
router.delete('/delete/:ISBN',authenticate, authorize('Admin'),  deleteBook); //https://localhost:3000/api/books/delete/:id

// Public (all authenticated users can view)
router.get('/getAllBooks', listBooks);

module.exports = router;


// const express = require('express');
// const {
//   addBook,
//   updateBook,
//   deleteBook,
//   listBooks,
// } = require('../controllers/bookController');
// const { authenticate, authorize } = require('../middleware/authMiddleware');
// const router = express.Router();

// // Admin-only routes
// router.post('/', authenticate, authorize('Admin'), addBook);
// router.put('/:id', authenticate, authorize('Admin'), updateBook);
// router.delete('/:id', authenticate, authorize('Admin'), deleteBook);

// // Public (all authenticated users can view)
// router.get('/', authenticate, listBooks);

// module.exports = router;
