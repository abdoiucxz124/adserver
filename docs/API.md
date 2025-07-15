# API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
Currently, no authentication is required. In production, implement proper authentication for admin endpoints.

## Endpoints

### Health Check
- **GET** `/health`
- Returns server health status

### Ad Serving

#### Get Ad
- **GET** `/api/ads`
- Query Parameters:
  - `placement` (optional): Ad placement type (e.g., 'banner', 'sidebar')
  - `category` (optional): Ad category (e.g., 'electronics', 'retail')
  - `userAgent` (optional): User agent string

#### Get Specific Ad
- **GET** `/api/ads/:id`
- Returns details for a specific ad

#### Create Ad (Admin)
- **POST** `/api/ads`
- Body:
```json
{
  "title": "Ad Title",
  "content": "Ad content",
  "imageUrl": "https://example.com/image.jpg",
  "clickUrl": "https://example.com/destination",
  "category": "electronics",
  "placement": "banner",
  "priority": 1
}
```

#### Update Ad (Admin)
- **PUT** `/api/ads/:id`
- Body: Same as create ad

#### Delete Ad (Admin)
- **DELETE** `/api/ads/:id`

### Analytics

#### Track Impression
- **POST** `/api/analytics/impression?adId=:adId`
- Tracks when an ad is displayed

#### Track Click
- **POST** `/api/analytics/click`
- Body:
```json
{
  "adId": "ad_id_here"
}
```

#### Get Analytics Report
- **GET** `/api/analytics/report`
- Query Parameters:
  - `startDate` (optional): Start date (ISO format)
  - `endDate` (optional): End date (ISO format)
  - `adId` (optional): Filter by specific ad ID

## Response Format

All responses follow this format:
```json
{
  "success": true|false,
  "data": "...", // or "message" for errors
  "error": "..." // only present if success is false
}
```