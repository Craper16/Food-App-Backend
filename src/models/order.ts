import { Schema, model, ObjectId, Types } from 'mongoose';
import { MealModel } from './meal';
import { UpgradeModel } from './upgrade';

export interface OrderModel {
  meals: MealModel[];
  amountToPay: number;
  upgrades: UpgradeModel[];
  comments: string;
  isDelivered: boolean;
  client: Types.ObjectId | undefined;
}

const orderSchema = new Schema<OrderModel>(
  {
    meals: [
      {
        type: Object,
        required: true,
      },
    ],
    upgrades: [{ type: Object, required: true }],
    amountToPay: {
      type: Number,
      required: true,
    },
    comments: {
      type: String,
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
