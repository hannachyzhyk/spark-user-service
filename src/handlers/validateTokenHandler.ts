import * as grpc from '@grpc/grpc-js';
import { ValidateTokenRequest, ValidateTokenResult } from '../gen/user_pb';
import jwt from 'jsonwebtoken'

export default async function login(
  call: grpc.ServerUnaryCall<ValidateTokenRequest, ValidateTokenResult>,
  callback: grpc.sendUnaryData<ValidateTokenResult>
) {
  if (call.request) {
    console.log(`(server) Got validate token request`);
  }

  const token = call.request.token;
  if (!token) {
    return callback(null, {
      valid: false
    } as ValidateTokenResult);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    console.log(`(server) Token valid for user: ${decoded.username} with roles: ${decoded.roles}`);

    const response = {
      valid: true,
      roles: decoded.roles || []
    } as ValidateTokenResult;

    callback(null, response);

  } catch (err) {
    callback(null, {
      valid: false
    } as ValidateTokenResult);
  }
}
