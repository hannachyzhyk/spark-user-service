import * as grpc from '@grpc/grpc-js';
import { LoginCode, LoginRequest, LoginResult } from '../gen/user_pb';

export default class LoginHandler {
   public static login(
        call: grpc.ServerUnaryCall<LoginRequest, LoginResult>,
        callback: grpc.sendUnaryData<LoginResult>
    ) {
        if (call.request) {
            console.log(`(server) Got client message: ${call.request.username} + ${call.request.password}`);
        }
        callback(null, {
            loginCode: LoginCode.SUCCESS,
            token: 'fake-token',
        } as LoginResult);
    }
}