import { Schema, model, ObjectId, Types } from 'mongoose';
import { MealModel } from './meal';
import { UpgradeModel } from './upgrade';

enum OrderMethod {
  TAKEAWAY = 'Takeaway',
  DELIVERY = 'Delivery',
}

export interface OrderModel {
  meals: MealModel[];
  amountToPay: number;
  upgrades: UpgradeModel[];
  comments: string;
  method: OrderMethod;
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
    method: {
      type: String,
      required: true,
    },
    isDelivered: {
      type: Boolean,
    },
  },

  { timestamps: true }
);

export const Order = model<OrderModel>('Order', orderSchema);
