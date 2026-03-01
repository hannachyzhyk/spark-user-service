import * as grpc from '@grpc/grpc-js';
import ServerConfigurator from './serverConfigurator';

const HOST_URL = 'localhost:9090';

const server = ServerConfigurator.getServer();

// Start the gRPC server
server.bindAsync(
  HOST_URL,
  grpc.ServerCredentials.createInsecure(),
  (err: Error | null, port: number) => {
    if (err) {
      console.error(`Server error: ${err.message}`);
    } else {
      console.log(`Server bound on port: ${port}`);
    }
  }
);