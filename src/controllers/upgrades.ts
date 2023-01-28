import { RequestHandler } from 'express';
import { ErrorResponse } from '../app';
import { Upgrade, UpgradeModel } from '../models/upgrade';

export const getUpgrades: RequestHandler = async (req, res, next) => {
  try {
    const upgrades = await Upgrade.find();
    return res.status(200).json({ upgrades: upgrades });
  } catch (error) {
    next(error);
  }
};

export const getUpgrade: RequestHandler = async (req, res, next) => {
  try {
    const { upgradeId } = req.params;

    const upgrade = await Upgrade.findById(upgradeId);

    if (!upgrade) {
      const error: ErrorResponse = {
        message: 'Upgrade not found',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }

    return res.status(200).json({ upgrade: upgrade });
  } catch (error) {
    next(error);
  }
};

export const createUpgrade: RequestHandler = async (req, res, next) => {
  try {
    const { title, price } = req.body as UpgradeModel;

    let upgrade = await Upgrade.findOne({ title: title });

    if (upgrade) {
      const error: ErrorResponse = {
        message: 'An upgrade with this title already exists',
        name: 'Already exists',
        status: 409,
      };
      throw error;
    }

    upgrade = new Upgrade({
      title: title,
      price: price,
    });

    await upgrade.save();
    return res.status(201).json({ upgrade: upgrade });
  } catch (error: any) {
    next(error);
  }
};

export const updateUpgrade: RequestHandler = async (req, res, next) => {
  try {
    const { upgradeId } = req.params;
    const { title, price } = req.body as UpgradeModel;

    const upgrade = await Upgrade.findById(upgradeId);

    if (!upgrade) {
      const error: ErrorResponse = {
        message: 'Upgrade not found',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }

    upgrade.title = title;
    upgrade.price = price;

    const result = await upgrade.save();

    return res.status(200).json({ upgrade: result });
  } catch (error) {
    next(error);
  }
};

export const deleteUpgrade: RequestHandler = async (req, res, next) => {
  try {
    const { upgradeId } = req.params;

    const upgrade = await Upgrade.findByIdAndRemove(upgradeId);

    if (!upgrade) {
      const error: ErrorResponse = {
        message: 'Upgrade not found',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }

    return res
      .status(200)
      .json({ message: 'Upgrade successfully deleted', upgrade: upgrade });
  } catch (error) {
    next(error);
  }
};
