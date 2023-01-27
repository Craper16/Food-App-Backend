import { RequestHandler } from 'express';
import { Category } from '../models/category';

export const createCategory: RequestHandler = async (req, res, next) => {
  try {
    const { title, image } = req.body as { title: string; image: string };

    let category = await Category.findOne({ title: title });

    if (category) {
      const error = new Error('Category already exists');
      throw error;
    }

    category = new Category({
      title: title,
      image: image,
    });

    await category.save();

    res.status(201).json({ category: category });
  } catch (error: any) {
    next(error);
  }
};
