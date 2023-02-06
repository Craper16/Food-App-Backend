import { Schema, model, Types } from 'mongoose';

export interface MealModel {
  title: string;
  image: string;
  description: string;
  price: number;
  _id: string | Types.ObjectId;
}

const mealSchema = new Schema<MealModel>({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Meal = model<MealModel>('Meal', mealSchema);
