import { RequestHandler } from 'express';
import { Category } from '../models/category';

import { Meal, MealModel } from '../models/meal';

export const getMeals: RequestHandler = async (req, res, next) => {
  try {
    const meals = await Meal.find();
    res.status(200).json({ meals: meals });
  } catch (error) {
    next(error);
  }
};

export const getMeal: RequestHandler = async (req, res, next) => {
  try {
    const { mealId } = req.params;
    const meal = await Meal.findById(mealId);

    if (!meal) {
      const error = new Error('Meal not found');
      throw error;
    }
    res.status(200).json({ meal: meal });
  } catch (error) {
    next(error);
  }
};

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

export const deleteMeal: RequestHandler = async (req, res, next) => {
  try {
    const { mealId } = req.params;

    const meal = await Meal.findByIdAndRemove(mealId);

    if (!meal) {
      const error = new Error('Meal not found');
      throw error;
    }

    res.status(200).json({ message: 'Successfully deleted meal', meal: meal });
  } catch (error) {
    next(error);
  }
};

export const updateMeal: RequestHandler = async (req, res, next) => {
  try {
    const { mealId } = req.params;
    const { title, image, description, price } = req.body as MealModel;

    const meal = await Meal.findById(mealId);

    if (!meal) {
      const error = new Error('Meal not found');
      throw error;
    }

    meal.title = title;
    meal.description = description;
    meal.image = image;
    meal.price = price;

    const result = await meal.save();

    res.status(200).json({ meal: result });
  } catch (error) {
    next(error);
  }
};
