import { Router } from 'express';
import {
  createMeal,
  deleteMeal,
  getMeal,
  getMeals,
  updateMeal,
} from '../controllers/meals';
import { isAuth } from '../middlewares/isAuth';

const router = Router();

router.get('/', isAuth, getMeals);

router.get('/:mealId', isAuth, getMeal);

router.post('/:categoryId/create-meal', isAuth, createMeal);

router.put('/:mealId', isAuth, updateMeal);

router.delete('/:mealIdd', isAuth, deleteMeal);

export default router;
