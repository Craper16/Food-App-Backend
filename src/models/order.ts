import { Schema, model, ObjectId, Types } from 'mongoose';
import { MealModel } from './meal';
import { UpgradeModel } from './upgrade';

export interface OrderModel {
  meals: { meal: MealModel; quantity: number }[];
  amountToPay: number;
  upgrades: { upgrade: UpgradeModel; quantity: number }[];
  isDelivered: boolean;
  client: Types.ObjectId | undefined;
}

const orderSchema = new Schema<OrderModel>(
  {
    meals: [
      {
        meal: {
          type: Object,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    upgrades: [
      {
        upgrade: {
          type: Object,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    amountToPay: {
      type: Number,
      required: true,
    },
    client: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
    isDelivered: {
      type: Boolean,
    },
  },

  { timestamps: true }
);

export const Order = model<OrderModel>('Order', orderSchema);
