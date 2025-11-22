# Java Text Summarization Service

## Setup
```bash
# Clone repository and switch to Java branch
git clone https://github.com/Lithia22/CST435.git
cd CST435
git checkout java-service
cd service_java
```

## Quick Start

### Using Docker (Recommended)
```bash
# Build the Docker image
docker build -t java-service .

# Run the container
docker run -p 50055:50055 --name java-container java-service
```

## API

- **gRPC Endpoint**: `0.0.0.0:50055`
- **Protocol**: gRPC
