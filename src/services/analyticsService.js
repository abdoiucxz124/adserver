// Mock data store for analytics (in production, this would be a database)
let impressions = [];
let clicks = [];

const recordImpression = async (impressionData) => {
  const impression = {
    id: generateId(),
    ...impressionData
  };
  impressions.push(impression);
  return impression;
};

const recordClick = async (clickData) => {
  const click = {
    id: generateId(),
    ...clickData
  };
  clicks.push(click);
  return click;
};

const generateReport = async (criteria) => {
  const { startDate, endDate, adId } = criteria;
  
  // Filter impressions and clicks by date range and adId
  const filteredImpressions = impressions.filter(imp => {
    const impDate = new Date(imp.timestamp);
    const dateMatch = impDate >= startDate && impDate <= endDate;
    const adMatch = !adId || imp.adId === adId;
    return dateMatch && adMatch;
  });

  const filteredClicks = clicks.filter(click => {
    const clickDate = new Date(click.timestamp);
    const dateMatch = clickDate >= startDate && clickDate <= endDate;
    const adMatch = !adId || click.adId === adId;
    return dateMatch && adMatch;
  });

  // Group by ad ID
  const adStats = {};
  
  filteredImpressions.forEach(imp => {
    if (!adStats[imp.adId]) {
      adStats[imp.adId] = { impressions: 0, clicks: 0 };
    }
    adStats[imp.adId].impressions++;
  });

  filteredClicks.forEach(click => {
    if (!adStats[click.adId]) {
      adStats[click.adId] = { impressions: 0, clicks: 0 };
    }
    adStats[click.adId].clicks++;
  });

  // Calculate CTR (Click-Through Rate)
  Object.keys(adStats).forEach(adId => {
    const stats = adStats[adId];
    stats.ctr = stats.impressions > 0 ? (stats.clicks / stats.impressions * 100).toFixed(2) : 0;
  });

  return {
    totalImpressions: filteredImpressions.length,
    totalClicks: filteredClicks.length,
    overallCtr: filteredImpressions.length > 0 ? 
      (filteredClicks.length / filteredImpressions.length * 100).toFixed(2) : 0,
    adStats,
    dateRange: {
      start: startDate,
      end: endDate
    }
  };
};

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

module.exports = {
  recordImpression,
  recordClick,
  generateReport
};