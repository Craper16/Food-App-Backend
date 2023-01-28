import { Router } from 'express';
import { addOrder } from '../controllers/orders';
import { isAuth } from '../middlewares/isAuth';

const router = Router();

router.get('/');

router.get('/:orderId');

router.post('/add-order', isAuth, addOrder);

router.put('/:orderId');

router.delete('/:orderId');

export default router;
