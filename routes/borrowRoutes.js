const { borrowBook,returnBook,getBorrowHistory } = require('../controllers/borrowController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const express = require('express')
const router = express.Router()

router.post('/', authenticate, authorize('Member'), borrowBook);
router.post('/return/:id', authenticate, authorize('Member'), returnBook);
router.get('/history', authenticate, authorize('Member'), getBorrowHistory);
module.exports = router;






















