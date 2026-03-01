import LoginHandler from './loginHandler';
import GetUserHandler from './getUserHandler';

// Available functions mapped to gRPC service methods
export default {
    login: LoginHandler.login,
    getUserByName: GetUserHandler.getUserByName
}