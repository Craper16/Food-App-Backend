import { Schema, model } from 'mongoose';

export interface UserModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
}

const userSchema = new Schema<UserModel>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
});

export const User = model<UserModel>('User', userSchema);
