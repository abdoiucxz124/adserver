const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// POST /api/analytics/impression - Track ad impression
router.post('/impression', analyticsController.trackImpression);

// POST /api/analytics/click - Track ad click
router.post('/click', analyticsController.trackClick);

// GET /api/analytics/report - Get analytics report
router.get('/report', analyticsController.getReport);

module.exports = router;