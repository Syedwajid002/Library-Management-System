const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const {mostBorrowedBooks,activeMembers,bookAvailability} = require('../controllers/reportController');

router.get('/most-borrowed', authenticate, authorize('Admin'), mostBorrowedBooks); //http://localhost:3000/api/reports/most-borrowed
router.get('/active-members', authenticate, authorize('Admin'), activeMembers); //http://localhost:3000/api/reports/active-members
router.get('/book-availability', authenticate, authorize('Admin'), bookAvailability); //http://localhost:3000/api/reports/book-availability


module.exports = router;
