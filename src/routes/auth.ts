import { Router } from 'express';
import {
  changeUserPassword,
  getUserData,
  refreshAccessToken,
  signin,
  signup,
} from '../controllers/auth';
import { isAuth } from '../middlewares/isAuth';
import { signUpValidation } from '../validations/authValidations';

const router = Router();

router.post('/signup', signUpValidation, signup);

router.post('/signin', signin);

router.get('/me', isAuth, getUserData);

router.put('/me/change-password', isAuth, changeUserPassword);

router.post('/refresh', refreshAccessToken);

export default router;
