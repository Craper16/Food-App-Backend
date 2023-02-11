import { Router } from 'express';
import {
  createUpgrade,
  deleteUpgrade,
  getUpgrade,
  getUpgrades,
  updateUpgrade,
} from '../controllers/upgrades';
import { isAuth } from '../middlewares/isAuth';

const router = Router();

router.get('/', isAuth, getUpgrades);

router.get('/:upgradeId', isAuth, getUpgrade);

router.post('/create-upgrade', isAuth, createUpgrade);

router.put('/:upgradeId', isAuth, updateUpgrade);

router.delete('/:upgradeId', isAuth, deleteUpgrade);

export default router;
