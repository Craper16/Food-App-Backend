import { RequestHandler } from 'express';
import { Category } from '../models/category';

import { Meal, MealModel } from '../models/meal';

export const createMeal: RequestHandler = async (req, res, next) => {
  try {
    const { title, description, price, image } = req.body as MealModel;
    const { categoryId } = req.params;

    let meal = await Meal.findOne({ title: title });
    const category = await Category.findById(categoryId);

    if (!category) {
      const error: Error = new Error('Category not found');
      throw error;
    }

    if (meal) {
      const error: Error = new Error('A meal with this title already exists');
      throw error;
    }

    meal = new Meal({
      title,
      image,
      description,
      price,
    });

    await meal.save();
    await category.meals.push(meal);
    await category.save();

    res.status(201).json({ meal: meal, category: category });
  } catch (error: any) {
    next(error);
  }
};
