// Mock data store for ads (in production, this would be a database)
let ads = [
  {
    id: '1',
    title: 'Premium Product Ad',
    content: 'Discover our amazing product with 50% off!',
    imageUrl: 'https://example.com/ad1.jpg',
    clickUrl: 'https://example.com/product1',
    category: 'electronics',
    placement: 'banner',
    active: true,
    priority: 1
  },
  {
    id: '2',
    title: 'Special Offer',
    content: 'Limited time offer - Buy now!',
    imageUrl: 'https://example.com/ad2.jpg',
    clickUrl: 'https://example.com/offer',
    category: 'retail',
    placement: 'sidebar',
    active: true,
    priority: 2
  }
];

let nextId = 3;

const selectAd = async (criteria) => {
  const { placement, category } = criteria;
  
  // Filter ads based on criteria
  let eligibleAds = ads.filter(ad => {
    if (!ad.active) return false;
    if (placement && ad.placement !== placement) return false;
    if (category && ad.category !== category) return false;
    return true;
  });

  if (eligibleAds.length === 0) {
    return null;
  }

  // Sort by priority and return the first one
  eligibleAds.sort((a, b) => a.priority - b.priority);
  return eligibleAds[0];
};

const getAdById = async (id) => {
  return ads.find(ad => ad.id === id);
};

const createAd = async (adData) => {
  const newAd = {
    id: String(nextId++),
    ...adData,
    active: true
  };
  ads.push(newAd);
  return newAd;
};

const updateAd = async (id, updateData) => {
  const index = ads.findIndex(ad => ad.id === id);
  if (index === -1) return null;
  
  ads[index] = { ...ads[index], ...updateData };
  return ads[index];
};

const deleteAd = async (id) => {
  const index = ads.findIndex(ad => ad.id === id);
  if (index === -1) throw new Error('Ad not found');
  
  ads.splice(index, 1);
  return true;
};

const getAllAds = async () => {
  return ads;
};

module.exports = {
  selectAd,
  getAdById,
  createAd,
  updateAd,
  deleteAd,
  getAllAds
};