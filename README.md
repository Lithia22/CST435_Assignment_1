# Python Text Analysis Service

## Setup
```bash
# Clone repository and switch to Python branch
git clone https://github.com/Lithia22/CST435.git
cd CST435
git checkout python-service
cd service_python
```

## Quick Start

### Using Docker (Recommended)
```bash
# Build the Docker image
docker build -t python-service .

# Run the container
docker run -p 50051:50051 --name python-container python-service
```

## API

- **gRPC Endpoint**: `0.0.0.0:50051`
- **Protocol**: gRPC
