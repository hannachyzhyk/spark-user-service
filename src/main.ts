import * as grpc from '@grpc/grpc-js';
import ServerConfigurator from './serverConfigurator';
import dotenv from 'dotenv';

dotenv.config();

const HOST_URL = 'localhost:9090';
(async () => {
  const server = ServerConfigurator.getServer();
  await ServerConfigurator.connectDb();

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
})();
