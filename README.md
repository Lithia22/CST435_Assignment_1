# CPC357 Project

1. **Node Service (`service_node`)**  
   - A **JavaScript service running on Node.js**.  
   - Acts as a gRPC server that detects the language of a given text using the `franc` library.  

2. **Main Controller (`main_controller`)**  
   - Acts as a gRPC client.  
   - Calls the Node Service and prints the detected language code to the console.  

3. **gRPC Contract (`proto/processor.proto`)**  
   - Defines the interface (service, request, and response messages) used by the Main Controller and all gRPC services.  
   - Ensures all services follow the same contract so clients can call them regardless of the implementation language.  

> Later, other teammates can add more services in different languages (e.g., Python, C++, Java), implement the same gRPC interface, and the Main Controller can call them.

## How to Run
1. Make sure Docker and Docker Compose are installed.
2. Open a terminal in the project root.
3. Run the services:
```bash
docker compose up --build
