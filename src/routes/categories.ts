import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/categories';

const router = Router();

router.get('/', getCategories);

router.get('/:categoryId', getCategory);

router.post('/create-category', createCategory);

router.delete('/:categoryId', deleteCategory);

router.put('/:categoryId', updateCategory);

export default router;
