import { RequestHandler } from 'express';
import { Upgrade, UpgradeModel } from '../models/upgrade';

export const createUpgrade: RequestHandler = async (req, res, next) => {
  try {
    const { title, price } = req.body as UpgradeModel;

    let upgrade = await Upgrade.findOne({ title: title });

    if (upgrade) {
      const error = new Error('An Upgrade with this title already exists');
      throw error;
    }

    upgrade = new Upgrade({
      title: title,
      price: price,
    });

    await upgrade.save();
    res.status(201).json({ upgrade: upgrade });
  } catch (error: any) {
    next(error);
  }
};
