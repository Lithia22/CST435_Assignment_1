# PHP Sentiment Analysis Service

## Setup
```bash
# Clone repository and switch to PHP branch
git clone https://github.com/Lithia22/CST435.git
cd CST435
git checkout php-service
cd service_php
```

## Quick Start

### Using Docker (Recommended)
```bash
# Build the Docker image
docker build -t php-service .

# Run the container
docker run -p 50052:50052 --name php-container php-service
```

## API

- **HTTP Endpoint**: `http://0.0.0.0:50052`
- **Protocol**: HTTP REST
- **Method**: POST
