import { Schema, model, ObjectId, Types } from 'mongoose';

export interface UserModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  orders: Types.ObjectId[];
  lifetimeAmountPaid: number;
  address: string;
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
  address: {
    type: String,
  },
  orders: [
    {
      type: Types.ObjectId,
      ref: 'Order',
    },
  ],
  lifetimeAmountPaid: {
    type: Number,
  },
});

export const User = model<UserModel>('User', userSchema);
