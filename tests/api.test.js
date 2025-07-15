const request = require('supertest');
const app = require('../src/index');

describe('AdServer API', () => {
  describe('Health Check', () => {
    it('should return 200 for health check', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(response.body.status).toBe('OK');
      expect(response.body.timestamp).toBeDefined();
      expect(response.body.uptime).toBeDefined();
    });
  });

  describe('Ad Serving', () => {
    it('should serve an ad', async () => {
      const response = await request(app)
        .get('/api/ads?placement=banner&category=electronics')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.ad).toBeDefined();
      expect(response.body.ad.id).toBeDefined();
      expect(response.body.ad.title).toBeDefined();
    });

    it('should return 404 when no suitable ad found', async () => {
      const response = await request(app)
        .get('/api/ads?placement=nonexistent&category=nonexistent')
        .expect(404);
      
      expect(response.body.success).toBe(false);
    });
  });

  describe('Analytics', () => {
    it('should track impression', async () => {
      const response = await request(app)
        .post('/api/analytics/impression?adId=1')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Impression tracked');
    });

    it('should track click', async () => {
      const response = await request(app)
        .post('/api/analytics/click')
        .send({ adId: '1' })
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Click tracked');
    });

    it('should generate analytics report', async () => {
      const response = await request(app)
        .get('/api/analytics/report')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.report).toBeDefined();
      expect(response.body.report.totalImpressions).toBeDefined();
      expect(response.body.report.totalClicks).toBeDefined();
    });
  });
});