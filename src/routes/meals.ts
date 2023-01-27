import { Router } from 'express';
import { createMeal } from '../controllers/meals';

const router = Router();

router.get('/');

router.get('/:mealId');

router.post('/:categoryId/create-meal', createMeal);

router.put('/:mealId');

router.delete('/:mealIdd');

export default router;
