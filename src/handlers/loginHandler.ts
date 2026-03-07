import * as grpc from '@grpc/grpc-js';
import { LoginRequest, LoginResult } from '../gen/user_pb';
import jwt from 'jsonwebtoken'
import userRepository from '../repositories/userRepository';

export default async function login(
  call: grpc.ServerUnaryCall<LoginRequest, LoginResult>,
  callback: grpc.sendUnaryData<LoginResult>
) {
  if (call.request) {
    console.log(`(server) Got client message: ${call.request.username} + ${call.request.password}`);
  }
  try {
    const user = await userRepository.getUser(call.request.username);

    if (!user) {
      return callback(new Error('User not found'), null);
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, roles: ['user'] }, // Payload
      process.env.JWT_SECRET!,             // Secret key
      { expiresIn: '24h' }                // Options (e.g., expiration)
    );

    callback(null, { token } as LoginResult);
  }

  catch (error: any) {
    return callback(new Error('Failed to login: ' + error?.message), null);
  }
}
