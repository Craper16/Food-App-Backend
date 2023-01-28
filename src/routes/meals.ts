import { Router } from 'express';
import {
  createMeal,
  deleteMeal,
  getMeal,
  getMeals,
  updateMeal,
} from '../controllers/meals';

const router = Router();

router.get('/', getMeals);

router.get('/:mealId', getMeal);

router.post('/:categoryId/create-meal', createMeal);

router.put('/:mealId', updateMeal);

router.delete('/:mealIdd', deleteMeal);

export default router;
