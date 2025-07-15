const adService = require('../services/adService');
const logger = require('../utils/logger');

// Serve an ad based on request parameters
const serveAd = async (req, res) => {
  try {
    const { placement, category, userAgent } = req.query;
    const clientIp = req.ip;
    
    const ad = await adService.selectAd({
      placement,
      category,
      userAgent,
      clientIp
    });

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: 'No suitable ad found'
      });
    }

    logger.info(`Ad served: ${ad.id} to ${clientIp}`);
    
    res.json({
      success: true,
      ad: {
        id: ad.id,
        title: ad.title,
        content: ad.content,
        imageUrl: ad.imageUrl,
        clickUrl: ad.clickUrl,
        impressionTrackingUrl: `/api/analytics/impression?adId=${ad.id}`
      }
    });
  } catch (error) {
    logger.error('Error serving ad:', error);
    res.status(500).json({
      success: false,
      message: 'Error serving ad'
    });
  }
};

// Get specific ad details
const getAd = async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await adService.getAdById(id);
    
    if (!ad) {
      return res.status(404).json({
        success: false,
        message: 'Ad not found'
      });
    }

    res.json({
      success: true,
      ad
    });
  } catch (error) {
    logger.error('Error getting ad:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving ad'
    });
  }
};

// Create new ad
const createAd = async (req, res) => {
  try {
    const adData = req.body;
    const ad = await adService.createAd(adData);
    
    res.status(201).json({
      success: true,
      ad
    });
  } catch (error) {
    logger.error('Error creating ad:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating ad'
    });
  }
};

// Update ad
const updateAd = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const ad = await adService.updateAd(id, updateData);
    
    if (!ad) {
      return res.status(404).json({
        success: false,
        message: 'Ad not found'
      });
    }

    res.json({
      success: true,
      ad
    });
  } catch (error) {
    logger.error('Error updating ad:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating ad'
    });
  }
};

// Delete ad
const deleteAd = async (req, res) => {
  try {
    const { id } = req.params;
    await adService.deleteAd(id);
    
    res.json({
      success: true,
      message: 'Ad deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting ad:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting ad'
    });
  }
};

module.exports = {
  serveAd,
  getAd,
  createAd,
  updateAd,
  deleteAd
};