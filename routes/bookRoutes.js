const express = require('express');
const{addBook, updateBook, deleteBook, listBooks} = require('../controllers/bookController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addBook',authenticate, authorize('Admin'),  addBook); //https://localhost:3000/api/books/addBook
router.put('/update/:ISBN',authenticate, authorize('Admin'),  updateBook); //https://localhost:3000/api/books/:id
router.delete('/delete/:ISBN',authenticate, authorize('Admin'),  deleteBook); //https://localhost:3000/api/books/delete/:id
router.get('/getAllBooks', listBooks); //https://localhost:3000/api/books/getAllBooks

module.exports = router;