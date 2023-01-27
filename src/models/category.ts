import { Schema, model, Types } from 'mongoose';
import { MealModel } from './meal';

interface CategoryModel {
  title: string;
  image: string;
  meals: MealModel[];
}

const categorySchema = new Schema<CategoryModel>({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  meals: [
    {
      type: Object,
    },
  ],
});

export const Category = model<CategoryModel>('Category', categorySchema);
