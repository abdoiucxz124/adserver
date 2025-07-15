# AdServer

A modern, scalable ad server built with Node.js for serving and managing digital advertisements with comprehensive analytics.

## 🚀 Features

- **Ad Serving**: Intelligent ad selection based on placement, category, and targeting criteria
- **Analytics**: Real-time tracking of impressions, clicks, and performance metrics
- **RESTful API**: Clean and well-documented API endpoints
- **Rate Limiting**: Built-in protection against abuse and excessive requests
- **Logging**: Comprehensive logging with Winston for monitoring and debugging
- **Docker Support**: Containerized deployment with Docker and Docker Compose
- **Testing**: Unit and integration tests with Jest
- **Security**: Helmet.js for security headers and CORS support

## 📁 Project Structure

```
adserver/
├── src/                    # Source code
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── utils/             # Utility functions
│   └── index.js           # Application entry point
├── config/                # Configuration files
├── tests/                 # Test files
├── docs/                  # Documentation
├── scripts/               # Utility scripts
├── logs/                  # Log files (created at runtime)
├── package.json           # Dependencies and scripts
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose configuration
└── README.md             # This file
```

## 🛠️ Installation

### Prerequisites

- Node.js 16.0.0 or higher
- npm 8.0.0 or higher
- Docker (optional, for containerized deployment)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/abdoiucxz124/adserver.git
   cd adserver
   ```

2. **Run the setup script**
   ```bash
   ./scripts/setup.sh
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the server**
   ```bash
   npm start
   ```

The server will be running at `http://localhost:3000`

### Manual Installation

```bash
# Install dependencies
npm install

# Create logs directory
mkdir -p logs

# Copy environment configuration
cp .env.example .env

# Run tests
npm test

# Start the server
npm start
```

## 🔧 Configuration

Create a `.env` file from `.env.example` and configure the following variables:

```env
NODE_ENV=development
PORT=3000
LOG_LEVEL=info

# Database Configuration (for future use)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=adserver
DB_USER=adserver_user
DB_PASS=your_password_here

# Security
JWT_SECRET=your_jwt_secret_here
ENCRYPTION_KEY=your_encryption_key_here
```

## 📚 API Documentation

### Health Check
```bash
GET /health
```

### Ad Serving
```bash
# Get an ad
GET /api/ads?placement=banner&category=electronics

# Get specific ad
GET /api/ads/:id

# Create new ad (Admin)
POST /api/ads
Content-Type: application/json
{
  "title": "Product Ad",
  "content": "Amazing product!",
  "imageUrl": "https://example.com/image.jpg",
  "clickUrl": "https://example.com/product",
  "category": "electronics",
  "placement": "banner"
}
```

### Analytics
```bash
# Track impression
POST /api/analytics/impression?adId=1

# Track click
POST /api/analytics/click
Content-Type: application/json
{
  "adId": "1"
}

# Get analytics report
GET /api/analytics/report?startDate=2023-01-01&endDate=2023-12-31
```

For detailed API documentation, see [docs/API.md](docs/API.md).

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🐳 Docker Deployment

### Using Docker

```bash
# Build the image
docker build -t adserver .

# Run the container
docker run -p 3000:3000 adserver
```

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📊 Monitoring and Logging

The application uses Winston for logging with different log levels:

- **Error logs**: `logs/error.log`
- **Combined logs**: `logs/combined.log`
- **Console output**: Development mode only

Log levels can be configured via the `LOG_LEVEL` environment variable.

## 🔒 Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Configurable request rate limiting
- **Input Validation**: Request validation with Joi
- **Error Handling**: Centralized error handling

## 🚦 Performance

- **Rate Limiting**: 100 requests per minute by default
- **Efficient Ad Selection**: Optimized algorithm for ad serving
- **Lightweight**: Minimal dependencies for fast startup
- **Health Checks**: Built-in health monitoring

## 🔄 Development

### Available Scripts

```bash
npm start          # Start the server
npm run dev        # Start with nodemon (development)
npm test           # Run tests
npm run test:watch # Run tests in watch mode
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
```

### Adding New Features

1. **Controllers**: Add request handlers in `src/controllers/`
2. **Routes**: Define API endpoints in `src/routes/`
3. **Services**: Implement business logic in `src/services/`
4. **Models**: Add data models in `src/models/`
5. **Tests**: Write tests in `tests/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/abdoiucxz124/adserver/issues)
- **API Reference**: [docs/API.md](docs/API.md)

## 🗺️ Roadmap

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication and authorization
- [ ] Advanced targeting algorithms
- [ ] Real-time bidding support
- [ ] Admin dashboard
- [ ] Advanced analytics and reporting
- [ ] Caching layer (Redis)
- [ ] Load balancer support
- [ ] A/B testing framework
- [ ] Machine learning for ad optimization

## 📈 Architecture

The AdServer follows a modular MVC-like architecture:

- **Routes** handle HTTP requests and responses
- **Controllers** coordinate between routes and services
- **Services** contain business logic and data manipulation
- **Models** define data structures and validation
- **Middleware** handles cross-cutting concerns (auth, logging, etc.)

This structure ensures maintainability, testability, and scalability as the application grows.