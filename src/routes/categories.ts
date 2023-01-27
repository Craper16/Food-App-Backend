import { Router } from 'express';
import { createCategory } from '../controllers/categories';

const router = Router();

router.get('/', () => {});

router.get('/:categoryId');

router.post('/create-category', createCategory);

router.delete('/:categoryId');

router.put('/:categoryId');

export default router;
