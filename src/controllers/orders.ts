import { RequestHandler } from 'express';
import { ErrorResponse } from '../app';
import { Order, OrderModel } from '../models/order';
import { User } from '../models/user';

export const getOrders: RequestHandler = async (req, res, next) => {
  try {
    const orders = await Order.find();

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

    if (user._id !== order.client) {
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
    const { meals, upgrades, amountToPay } = req.body as OrderModel;

    const user = await User.findById(req.userId);

    if (!user) {
      const error: ErrorResponse = {
        message: 'User not found',
        name: 'Not found',
        status: 404,
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

    const order = new Order({
      meals: meals,
      upgrades: upgrades,
      amountToPay: amountToPay,
      client: req.userId,
      isDelivered: false,
    });

    const result = await order.save();

    res
      .status(201)
      .json({ message: 'Order added successfully', order: result });
  } catch (error) {
    next(error);
  }
};
