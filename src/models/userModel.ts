import { Schema, model } from 'mongoose';

export interface User extends Document {
  _id: string;
  username: string;
  password: string;
}

export const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = model<User>('User', UserSchema);
