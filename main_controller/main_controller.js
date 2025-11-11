import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = '/proto/processor.proto';
const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcObj = grpc.loadPackageDefinition(packageDef).distributed;

function callService(address, text) {
  return new Promise((resolve, reject) => {
    const client = new grpcObj.Processor(address, grpc.credentials.createInsecure());
    client.Process({ text }, (err, resp) => {
      if (err) return reject(err);
      resolve(resp.result);
    });
  });
}

async function main() {
  const address = process.env.SERVICE_ADDR || 'python_service:50051'; // default placeholder
  // but for local test with docker-compose we will set SERVICE_ADDR=node_service:50054
  const text = "This is a sample text to analyze. Bonjour, ceci est en français!";
  try {
    const result = await callService(process.env.SERVICE_ADDR || 'node_service:50054', text);
    console.log('Service result:', result);
  } catch (err) {
    console.error('Call error:', err);
    process.exit(1);
  }
}

main();
