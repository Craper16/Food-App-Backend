import { RequestHandler } from 'express';
import mongoose, { Types } from 'mongoose';
import { ErrorResponse } from '../app';
import { Meal } from '../models/meal';
import { Order, OrderModel } from '../models/order';
import { Upgrade } from '../models/upgrade';
import { User } from '../models/user';

export const getOrders: RequestHandler = async (req, res, next) => {
  try {
    const orders = await Order.find({ client: req.userId }).sort({
      updatedAt: -1,
    });

    return res.status(200).json({ orders: orders });
  } catch (error) {
    next(error);
  }
};

export const getOrder: RequestHandler = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const user = await User.findById(req.userId);
    const order = await Order.findById(orderId);

    if (!user) {
      const error: ErrorResponse = {
        message: 'User not found',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }

    if (!order) {
      const error: ErrorResponse = {
        message: 'Order not found',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }

    if (order.client?._id.toString() !== user._id.toString()) {
      const error: ErrorResponse = {
        message: 'Unauthorized',
        name: 'Unauthorized',
        status: 401,
      };
      throw error;
    }

    return res.status(200).json({ order: order });
  } catch (error) {
    next(error);
  }
};

export const addOrder: RequestHandler = async (req, res, next) => {
  try {
    const { meals, upgrades, comments, method } = req.body as OrderModel;

    const user = await User.findById(req.userId);

    if (!user) {
      const error: ErrorResponse = {
        message: 'User not found',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }

    if (!user.address) {
      const error: ErrorResponse = {
        message: 'Please provide your address before ordering',
        name: 'No address',
        status: 403,
      };
      throw error;
    }

    if (meals.length === 0) {
      const error: ErrorResponse = {
        message: 'No meals selected, please select a meal before adding order',
        name: 'No Meals Selected',
        status: 403,
      };
      throw error;
    }

    meals.map((meal) => {
      meal.title = meal.title;
      meal.price = meal.price;
      meal.image = meal.image;
      meal.description = meal.description;
      meal._id = new mongoose.Types.ObjectId(meal._id);
    });

    upgrades.map((upgrade) => {
      upgrade.price = upgrade.price;
      upgrade.title = upgrade.title;
      upgrade._id = new Types.ObjectId(upgrade._id);
    });

    let totalMealPayout: number = 0;
    let totalUpgradePayout: number = 0;

    await meals.map((meal) => (totalMealPayout = meal.price + totalMealPayout));

    await upgrades.map(
      (upgrade) => (totalUpgradePayout = upgrade.price + totalUpgradePayout)
    );

    const totalPayAmount = totalMealPayout + totalUpgradePayout;

    const order = new Order({
      meals: meals,
      upgrades: upgrades,
      amountToPay: totalPayAmount,
      comments: comments,
      method: method,
      client: req.userId,
      isDelivered: false,
    });

    const result = await order.save();

    return res
      .status(201)
      .json({ message: 'Order added successfully', order: result });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder: RequestHandler = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findByIdAndRemove(orderId);

    if (order?.client?._id.toString() !== req.userId.toString()) {
      const error: ErrorResponse = {
        message: 'Unauthorized',
        name: 'Unauthorized',
        status: 401,
      };
      throw error;
    }
    if (!order) {
      const error: ErrorResponse = {
        message: 'Order not found',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }

    return res
      .status(200)
      .json({ message: `Order deleted`, deletedOrder: order });
  } catch (error) {
    next(error);
  }
};
