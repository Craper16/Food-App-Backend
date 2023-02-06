import { Router } from 'express';
import {
  changeUserPassword,
  getUserData,
  refreshAccessToken,
  signin,
  signup,
  updateUser,
} from '../controllers/auth';
import { isAuth } from '../middlewares/isAuth';
import {
  signInValidation,
  signUpValidation,
} from '../validations/authValidations';

const router = Router();

router.post('/signup', signUpValidation, signup);

router.post('/signin', signInValidation, signin);

router.get('/me', isAuth, getUserData);

router.put('/me/change-password', isAuth, changeUserPassword);

router.post('/refresh', refreshAccessToken);

router.put('/update-user', isAuth, updateUser);

export default router;
