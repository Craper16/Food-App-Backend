import { Router } from 'express';

const router = Router();

router.get('/');

router.get('/:orderId');

router.post('/add-order');

router.put('/:orderId');

router.delete('/:orderId');

export default router;
