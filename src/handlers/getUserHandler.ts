import * as grpc from '@grpc/grpc-js';
import { GetUserByNameRequest, GetUserResult } from '../gen/user_pb';

export default class GetUserHandler {
    public static getUserByName(call: grpc.ServerUnaryCall<GetUserByNameRequest, GetUserResult>, callback: grpc.sendUnaryData<GetUserResult>) {
        const username = call.request.username;
        console.log(`(server) Received getUserByName request for username: ${username}`);
        callback(null, {
            user: {
                username: 'testuser',
                email: `test@gmail.com`
            }
        } as GetUserResult);
    }
}