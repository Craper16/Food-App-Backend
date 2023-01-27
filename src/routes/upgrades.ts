import { Router } from 'express';
import { createUpgrade } from '../controllers/upgrades';

const router = Router();

router.get('/');

router.get('/:upgradeId');

router.post('/create-upgrade', createUpgrade);

router.put('/:upgradeId');

router.delete('/:upgradeId');

export default router;
