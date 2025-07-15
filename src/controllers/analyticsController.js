const analyticsService = require('../services/analyticsService');
const logger = require('../utils/logger');

// Track ad impression
const trackImpression = async (req, res) => {
  try {
    const { adId } = req.query;
    const clientIp = req.ip;
    const userAgent = req.get('User-Agent');
    
    await analyticsService.recordImpression({
      adId,
      clientIp,
      userAgent,
      timestamp: new Date()
    });

    logger.info(`Impression tracked for ad: ${adId}`);
    
    res.status(200).json({
      success: true,
      message: 'Impression tracked'
    });
  } catch (error) {
    logger.error('Error tracking impression:', error);
    res.status(500).json({
      success: false,
      message: 'Error tracking impression'
    });
  }
};

// Track ad click
const trackClick = async (req, res) => {
  try {
    const { adId } = req.body;
    const clientIp = req.ip;
    const userAgent = req.get('User-Agent');
    
    await analyticsService.recordClick({
      adId,
      clientIp,
      userAgent,
      timestamp: new Date()
    });

    logger.info(`Click tracked for ad: ${adId}`);
    
    res.status(200).json({
      success: true,
      message: 'Click tracked'
    });
  } catch (error) {
    logger.error('Error tracking click:', error);
    res.status(500).json({
      success: false,
      message: 'Error tracking click'
    });
  }
};

// Get analytics report
const getReport = async (req, res) => {
  try {
    const { startDate, endDate, adId } = req.query;
    
    const report = await analyticsService.generateReport({
      startDate: startDate ? new Date(startDate) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      endDate: endDate ? new Date(endDate) : new Date(),
      adId
    });
    
    res.json({
      success: true,
      report
    });
  } catch (error) {
    logger.error('Error generating report:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating report'
    });
  }
};

module.exports = {
  trackImpression,
  trackClick,
  getReport
};