import { Schema, model } from 'mongoose';
import { MealModel } from './meal';

export interface OrderModel {
  meals: { meal: MealModel; quantity: number }[];
  isDelivered: boolean;
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
    isDelivered: {
      type: Boolean,
    },
  },

  { timestamps: true }
);

export const Order = model<OrderModel>('Order', orderSchema);
