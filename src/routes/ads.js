const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');

// GET /api/ads - Get ad for serving
router.get('/', adController.serveAd);

// GET /api/ads/:id - Get specific ad details
router.get('/:id', adController.getAd);

// POST /api/ads - Create new ad (admin)
router.post('/', adController.createAd);

// PUT /api/ads/:id - Update ad (admin)
router.put('/:id', adController.updateAd);

// DELETE /api/ads/:id - Delete ad (admin)
router.delete('/:id', adController.deleteAd);

module.exports = router;