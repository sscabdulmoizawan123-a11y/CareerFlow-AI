const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', protect, async (req, res) => {
  try {
    const uid = req.user._id;
    const total = await Application.countDocuments({ user: uid });
    const byStatus = await Application.aggregate([
      { $match: { user: uid } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    res.json({ success: true, data: { total, byStatus } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
