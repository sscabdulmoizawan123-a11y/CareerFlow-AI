const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, (req, res) => {
  res.json({ success: true, message: 'Job listings endpoint - coming soon!' });
});

module.exports = router;
