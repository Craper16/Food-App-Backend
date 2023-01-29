import { Router } from 'express';
import {
  addOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from '../controllers/orders';
import { isAuth } from '../middlewares/isAuth';

const router = Router();

router.get('/', isAuth, getOrders);

router.get('/:orderId', isAuth, getOrder);

router.post('/add-order', isAuth, addOrder);

router.put('/:orderId', isAuth, updateOrder);

router.delete('/:orderId', isAuth, deleteOrder);

export default router;
