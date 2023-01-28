import { RequestHandler } from 'express';
import { ErrorResponse } from '../app';
import { Category, CategoryModel } from '../models/category';

export const getCategories: RequestHandler = async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ categories: categories });
  } catch (error) {
    next(error);
  }
};

export const getCategory: RequestHandler = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);

    if (!category) {
      const error: ErrorResponse = {
        message: 'Category not found',
        name: 'Not Found',
        status: 404,
      };
      throw error;
    }

    return res.status(200).json({ category: category });
  } catch (error) {
    next(error);
  }
};

export const createCategory: RequestHandler = async (req, res, next) => {
  try {
    const { title, image } = req.body as { title: string; image: string };

    let category = await Category.findOne({ title: title });

    if (category) {
      const error: ErrorResponse = {
        message: 'Category with this title already exists',
        name: 'Already Exists',
        status: 402,
      };
      throw error;
    }

    category = new Category({
      title: title,
      image: image,
    });

    await category.save();

    return res.status(201).json({ category: category });
  } catch (error: any) {
    next(error);
  }
};

export const updateCategory: RequestHandler = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { title, image } = req.body as CategoryModel;

    const category = await Category.findById(categoryId);

    if (!category) {
      const error: ErrorResponse = {
        message: 'Category not found',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }

    category.title = title;
    category.image = image;

    const result = await category.save();

    return res.status(200).json({ category: result });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory: RequestHandler = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findByIdAndRemove(categoryId);

    if (!category) {
      const error: ErrorResponse = {
        message: 'Category not found',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }

    return res
      .status(200)
      .json({ message: 'Successfully removed category', category: category });
  } catch (error) {
    next(error);
  }
};
