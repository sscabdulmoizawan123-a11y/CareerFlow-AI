const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.post('/analyze', protect, (req, res) => {
  res.json({ success: true, message: 'Resume analysis endpoint - coming soon!' });
});

module.exports = router;
