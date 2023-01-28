import { Router } from 'express';
import { addOrder, getOrder, getOrders } from '../controllers/orders';
import { isAuth } from '../middlewares/isAuth';

const router = Router();

router.get('/', isAuth, getOrders);

router.get('/:orderId', isAuth, getOrder);

router.post('/add-order', isAuth, addOrder);

router.put('/:orderId');

router.delete('/:orderId');

export default router;
