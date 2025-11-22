# C++ Keyword Extraction Service

## Setup
```bash
# Clone repository and switch to C++ branch
git clone https://github.com/Lithia22/CST435.git
cd CST435
git checkout cpp-service
cd service_cpp
```

## Quick Start

### Using Docker (Recommended)
```bash
# Build the Docker image
docker build -t cpp-service .
```

# Run the container
docker run -p 50053:50053 --name cpp-container cpp-service

## API
- **gRPC Endpoint**: `0.0.0.0:50053`
- **Protocol**: gRPC
