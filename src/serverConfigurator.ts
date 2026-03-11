import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import { UserServiceDefinition } from './models/userServiceDefinition';
import handlers from './handlers';
import mongoose from 'mongoose';

export default class ServerConfigurator {
  public static getServer(): grpc.Server {
    const packageDefinition = protoLoader.loadSync('./proto/user.proto');
    const proto = grpc.loadPackageDefinition(
      packageDefinition
    ) as unknown as UserServiceDefinition;
    const server = new grpc.Server();
    server.addService(proto.user.v1.UserService.service, handlers);
    return server;
  }

  public static async connectDb(): Promise<void> {
    if (!process.env.MONGO_CONN_STR) {
      throw new Error('MONGO_CONN_STR environment variable is not set');
    }
    try {
      await mongoose.connect(process.env.MONGO_CONN_STR);
      console.log(`Connected to MongoDB successfully`);
    }
    catch (error: any) {
      console.error(`Failed to connect to MongoDB`);
    }
  }


}
