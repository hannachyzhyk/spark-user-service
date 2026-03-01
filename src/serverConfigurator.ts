import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import { UserServiceDefinition } from './models/userServiceDefinition';
import handlers from './handlers';

export default class ServerConfigurator {
    public static getServer(): grpc.Server {
        const packageDefinition = protoLoader.loadSync('./proto/user.proto');
        const proto = grpc.loadPackageDefinition(
            packageDefinition
        ) as unknown as UserServiceDefinition;
        const server = new grpc.Server();
        server.addService(proto.UserService.service, handlers);
        return server;
    }
}