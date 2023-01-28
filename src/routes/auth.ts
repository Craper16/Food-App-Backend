import { Router } from 'express';
import {
  changeUserPassword,
  getUserData,
  getUserOrders,
  refreshAccessToken,
  signin,
  signup,
} from '../controllers/auth';
import { isAuth } from '../middlewares/isAuth';

const router = Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.get('/me', isAuth, getUserData);

router.get('/me/orders', isAuth, getUserOrders);

router.put('/me/change-password', isAuth, changeUserPassword);

router.post('/refresh', refreshAccessToken);

export default router;
