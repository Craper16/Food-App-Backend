import { Schema, model, ObjectId } from 'mongoose';

export interface MealModel {
  title: string;
  image: string;
  description: string;
  price: number;
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
