import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/categories';
import { isAuth } from '../middlewares/isAuth';

const router = Router();

router.get('/', getCategories);

router.get('/:categoryId', getCategory);

router.post('/create-category', isAuth, createCategory);

router.delete('/:categoryId', isAuth, deleteCategory);

router.put('/:categoryId', isAuth, updateCategory);

export default router;
