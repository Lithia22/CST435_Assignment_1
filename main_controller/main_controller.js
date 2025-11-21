import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const PROTO_PATH = "/proto/processor.proto";
const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcObj = grpc.loadPackageDefinition(packageDef).distributed;

// HTTP function for PHP service
async function callHTTPService(serviceName, address, text) {
  try {
    const response = await fetch(`http://${address}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text }),
    });
    const data = await response.json();
    return `✅ ${serviceName}: ${data.result}`;
  } catch (error) {
    return `❌ ${serviceName}: Failed - ${error.message}`;
  }
}

// gRPC function for other services
function callGRPCService(serviceName, address, text) {
  return new Promise((resolve, reject) => {
    console.log(`🔗 Calling ${serviceName} at ${address}...`);
    const client = new grpcObj.Processor(
      address,
      grpc.credentials.createInsecure()
    );

    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 10);

    client.Process({ text }, { deadline: deadline.getTime() }, (err, resp) => {
      if (err) {
        reject(`❌ ${serviceName} error: ${err.message}`);
      } else {
        resolve(`✅ ${serviceName}: ${resp.result}`);
      }
    });
  });
}

async function callAllServices(text) {
  const services = {
    python: { address: "10.212.95.147:50051", type: "grpc" },
    php: { address: "10.212.94.105:50052", type: "http" }, // PHP uses HTTP
    cpp: { address: "10.212.93.250:50053", type: "grpc" },
    node: { address: "10.212.92.254:50054", type: "grpc" },
    java: { address: "10.212.94.229:50055", type: "grpc" },
  };

  console.log("🚀 Starting distributed service calls across 5 laptops...\n");

  const promises = Object.entries(services).map(([serviceName, config]) => {
    if (config.type === "http") {
      return callHTTPService(serviceName, config.address, text);
    } else {
      return callGRPCService(serviceName, config.address, text);
    }
  });

  const results = await Promise.allSettled(promises);

  console.log("\n📊 FINAL RESULTS:");
  console.log("================");
  results.forEach((result, index) => {
    const serviceName = Object.keys(services)[index];
    if (result.status === "fulfilled") {
      console.log(result.value);
    } else {
      console.log(`❌ ${serviceName}: Failed - ${result.reason}`);
    }
  });
}

// Test text
const text =
  "Hello world! This text will be processed by all 5 distributed services running on different laptops. Hello Lithia. I think im dumb.";

callAllServices(text);
