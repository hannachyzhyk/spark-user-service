import login from './loginHandler';
import signUp from './signUpHandler';
import GetUserHandler from './getUserHandler';
import validateToken from './validateTokenHandler';

// Available functions mapped to gRPC service methods
export default {
  login,
  signUp,
  getUserByName: GetUserHandler.getUserByName,
  validateToken: validateToken
}
