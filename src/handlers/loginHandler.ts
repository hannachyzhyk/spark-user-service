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

    if (!process.env.JWT_SECRET || !process.env.JWT_LIFETIME) {
      return callback(new Error('JWT_SECRET and JWT_LIFETIME must be set in environment variables'), null);
    }

    if (!await userRepository.comparePassword(call.request.password, user.password)) {
      return callback(new Error('Invalid password'), null);
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, roles: ['user'] },
      process.env.JWT_SECRET as jwt.Secret,
      { expiresIn: process.env.JWT_LIFETIME } as jwt.SignOptions);

    callback(null, { token } as LoginResult);
  }

  catch (error: any) {
    return callback(new Error('Failed to login: ' + error?.message), null);
  }
}
