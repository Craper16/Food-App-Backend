import { RequestHandler } from 'express';
import { ErrorResponse } from '../app';
import { Category } from '../models/category';

import { Meal, MealModel } from '../models/meal';

export const getMeals: RequestHandler = async (req, res, next) => {
  try {
    const meals = await Meal.find();
    return res.status(200).json({ meals: meals });
  } catch (error) {
    next(error);
  }
};

export const getMeal: RequestHandler = async (req, res, next) => {
  try {
    const { mealId } = req.params;
    const meal = await Meal.findById(mealId);

    if (!meal) {
      const error: ErrorResponse = {
        message: 'Meal not found',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }
    return res.status(200).json({ meal: meal });
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
      const error: ErrorResponse = {
        message: 'Category not found',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }

    if (meal) {
      const error: ErrorResponse = {
        message: 'A meal with this title already exists',
        name: 'Already Exists',
        status: 409,
      };
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

    return res.status(201).json({ meal: meal, category: category });
  } catch (error: any) {
    next(error);
  }
};

export const deleteMeal: RequestHandler = async (req, res, next) => {
  try {
    const { mealId } = req.params;

    const meal = await Meal.findByIdAndRemove(mealId);

    if (!meal) {
      const error: ErrorResponse = {
        message: 'Meal not found',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }

    return res
      .status(200)
      .json({ message: 'Successfully deleted meal', meal: meal });
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
      const error: ErrorResponse = {
        message: 'Meal not found',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }

    meal.title = title;
    meal.description = description;
    meal.image = image;
    meal.price = price;

    const result = await meal.save();

    return res.status(200).json({ meal: result });
  } catch (error) {
    next(error);
  }
};
