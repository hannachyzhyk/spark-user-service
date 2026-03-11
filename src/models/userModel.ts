import { Schema, model, HydratedDocument } from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

export interface User extends Document {
  _id: string;
  username: string;
  password: string;
}

export const UserSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash the password before saving the user, disabling ts errors since this is a mongoose middleware
// and ts is poorly supported
// @ts-ignore
UserSchema.pre<User>('save', async function (this: HydratedDocument<User>) {
  if (!this.isModified('password'))
    return;

  try {
    this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
  } catch (err) {
    console.error('Error hashing password:', err);
  } finally {
    return;
  }
});

export const UserModel = model<User>('User', UserSchema);
