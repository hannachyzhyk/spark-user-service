import login from './loginHandler';
import register from './registerHandler';
import GetUserHandler from './getUserHandler';
import validateToken from './validateTokenHandler';

// Available functions mapped to gRPC service methods
export default {
  login,
  register,
  getUserByName: GetUserHandler.getUserByName,
  validateToken: validateToken
}
