import { User } from '../models/userModel';

export function mapUserToGrpcResponse(user: User): any {
  return {
    id: user._id,
    username: user.username,
    password: user.password,
  };
}

