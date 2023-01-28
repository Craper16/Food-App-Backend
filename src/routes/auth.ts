import { Router } from 'express';
import { refreshAccessToken, signin, signup } from '../controllers/auth';

const router = Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/refresh', refreshAccessToken);

export default router;
