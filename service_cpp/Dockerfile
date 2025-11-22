FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    build-essential \
    g++ \
    pkg-config \
    libgrpc-dev \
    libgrpc++-dev \
    protobuf-compiler \
    protobuf-compiler-grpc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

# Generate gRPC code with absolute path
RUN protoc -I. --grpc_out=. --cpp_out=. --plugin=protoc-gen-grpc=/usr/bin/grpc_cpp_plugin processor.proto

# Compile
RUN g++ -o server \
    server.cpp \
    processor.pb.cc \
    processor.grpc.pb.cc \
    -lgrpc++ -lgrpc -lprotobuf -lpthread

EXPOSE 50053
CMD ["./server"]