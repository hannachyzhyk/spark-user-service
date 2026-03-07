import { User, UserModel } from '../models/userModel';

export default class UserRepository {

  public static async createUser(username: string, password: string): Promise<User | null> {
    const user = new UserModel({ username, password });
    try {
      return await user.save();
    }
    catch (error: any) {
      console.error(`Failed to create user: ${error.message}`);
      return null;
    }
  }

  public static async getUser(username: string): Promise<User | null> {
    return await UserModel.findOne({ username }).exec();
  }
}
