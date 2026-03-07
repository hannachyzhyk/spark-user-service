import * as grpc from '@grpc/grpc-js';
import { RegisterRequest, RegisterResult } from '../gen/user_pb';
import userRepository from '../repositories/userRepository';
import jwt from 'jsonwebtoken';

export default async function register(
  call: grpc.ServerUnaryCall<RegisterRequest, RegisterResult>,
  callback: grpc.sendUnaryData<RegisterResult>
) {
  if (call.request) {
    console.log(`(server) Got register request for: ${call.request.username} + ${call.request.password}`);
  }

  if (!call.request.username || !call.request.password) {
    return callback(new Error('Username and password are required'), null);
  }

  try {
    const newUser = await userRepository.createUser(call.request.username, call.request.password);

    if (!newUser) {
      return callback(new Error('Failed to create user'), null);
    }

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username }, // Payload
      process.env.JWT_SECRET!,             // Secret key
      { expiresIn: '24h' }                // Options (e.g., expiration)
    );

    console.log(`User created with ID: ${newUser._id}`);
    return callback(null, { token } as unknown as RegisterResult);
  }
  catch (error: any) {
    return callback(new Error('Failed to create user: ' + error?.message), null);
  }
}
