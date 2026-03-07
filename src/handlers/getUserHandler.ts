import * as grpc from '@grpc/grpc-js';
import { GetUserByNameRequest, GetUserResult } from '../gen/user_pb';
import userRepository from '../repositories/userRepository';
import { mapUserToGrpcResponse } from '../utils/userMapper';

export default class GetUserHandler {
  public static async getUserByName(call: grpc.ServerUnaryCall<GetUserByNameRequest, GetUserResult>, callback: grpc.sendUnaryData<GetUserResult>) {
    const username = call.request.username;
    try {
      const user = await userRepository.getUser(username);
      callback(null, { user: mapUserToGrpcResponse(user!) } as unknown as GetUserResult);
    }
    catch (error: any) {
      console.error(`Failed to get user: ${error.message}`);
      return callback(new Error('Failed to get user: ' + error?.message), null);
    }

  }
}
