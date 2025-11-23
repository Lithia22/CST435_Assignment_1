#4.53 am

# FROM python:3.9-slim

# WORKDIR /app

# # Copy requirements first for better caching
# COPY requirements.txt .

# # Install dependencies
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy proto file and generate Python gRPC code
# COPY ../proto/processor.proto .
# RUN python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. processor.proto

# # Copy application code
# COPY server.py .
# COPY __init__.py .

# # Expose the port
# EXPOSE 50051

# # Start the server
# CMD ["python", "server.py"]


FROM python:3.9-slim

WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code first
COPY server.py .
COPY __init__.py .

# Copy proto file from the mounted volume will be available at runtime
# The proto file will be available via the volume mount in docker-compose

# Expose the port
EXPOSE 50051

# Generate gRPC code and start the server
CMD python -m grpc_tools.protoc -I/proto --python_out=. --grpc_python_out=. /proto/processor.proto && python server.py