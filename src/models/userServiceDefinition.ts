import { GrpcObject } from '@grpc/grpc-js';

export interface UserServiceDefinition extends GrpcObject {
  user: {
    v1: {
      UserService: any;
    }
  }
}
