import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { franc } from 'franc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = '/proto/processor.proto';
const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const grpcObj = grpc.loadPackageDefinition(packageDef).distributed;

function Process(call, callback) {
  const text = call.request.text || '';
  if (!text.trim()) {
    callback(null, { result: 'No text provided' });
    return;
  }
  // franc returns language code (e.g., "eng", "spa")
  const langCode = franc(text, { minLength: 2 });
  callback(null, { result: `Detected Language Code: ${langCode}` });
}

function main() {
  const server = new grpc.Server();
  server.addService(grpcObj.Processor.service, { Process });
  const port = '0.0.0.0:50054';
  server.bindAsync(port, grpc.ServerCredentials.createInsecure(), (err, _) => {
    if (err) {
      console.error('Server bind error:', err);
      return;
    }
    console.log('Node.js service running on port 50054');
    server.start();
  });
}

main();
