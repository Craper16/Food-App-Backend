import { RequestHandler } from 'express';
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
    const { meals, upgrades, comments } = req.body as OrderModel;

    if (meals.length === 0) {
      const error: ErrorResponse = {
        message: 'No meals selected, please select a meal before adding order',
        name: 'No Meals Selected',
        status: 403,
      };
      throw error;
    }

    const mealsToSend = await Meal.find({
      title: meals.map((meal) => meal.title),
      description: meals.map((meal) => meal.description),
      image: meals.map((meal) => meal.image),
      price: meals.map((meal) => meal.price),
    });

    const upgradesToSend = await Upgrade.find({
      title: upgrades.map((upgrade) => upgrade.title),
      price: upgrades.map((upgrade) => upgrade.price),
    });

    if (upgradesToSend.length !== upgrades.length) {
      const error: ErrorResponse = {
        message:
          'Invalid upgrades are present, please check your upgrades specifications and try again',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }

    if (mealsToSend.length !== meals.length) {
      const error: ErrorResponse = {
        message:
          'Invalid meals are present, please check your meals specifications and try again',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }

    let totalMealPayout: number = 0;
    let totalUpgradePayout: number = 0;

    await mealsToSend.map(
      (meal) => (totalMealPayout = meal.price + totalMealPayout)
    );

    await upgradesToSend.map(
      (upgrade) => (totalUpgradePayout = upgrade.price + totalUpgradePayout)
    );

    const totalPayAmount = totalMealPayout + totalUpgradePayout;

    const order = new Order({
      meals: mealsToSend,
      upgrades: upgradesToSend,
      amountToPay: totalPayAmount,
      comments: comments,
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

export const updateOrder: RequestHandler = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { meals, upgrades, comments } = req.body as OrderModel;

    const order = await Order.findById(orderId);
    const user = await User.findById(req.userId);

    if (!order) {
      const error: ErrorResponse = {
        message: 'Order not found',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }

    if (order.client?._id.toString() !== user?._id.toString()) {
      const error: ErrorResponse = {
        message: 'Unauthorized',
        name: 'Unauthorized',
        status: 401,
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

    const mealsToSend = await Meal.find({
      title: meals.map((meal) => meal.title),
      description: meals.map((meal) => meal.description),
      image: meals.map((meal) => meal.image),
      price: meals.map((meal) => meal.price),
    });

    const upgradesToSend = await Upgrade.find({
      title: upgrades.map((upgrade) => upgrade.title),
      price: upgrades.map((upgrade) => upgrade.price),
    });

    if (upgradesToSend.length !== upgrades.length) {
      const error: ErrorResponse = {
        message:
          'Invalid upgrades are present, please check your upgrades specifications and try again',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }

    if (mealsToSend.length !== meals.length) {
      const error: ErrorResponse = {
        message:
          'Invalid meals are present, please check your meals specifications and try again',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }

    let totalMealPayout: number = 0;
    let totalUpgradePayout: number = 0;

    await mealsToSend.map(
      (meal) => (totalMealPayout = meal.price + totalMealPayout)
    );

    await upgradesToSend.map(
      (upgrade) => (totalUpgradePayout = upgrade.price + totalUpgradePayout)
    );

    const totalPayAmount = totalMealPayout + totalUpgradePayout;

    order.meals = mealsToSend;
    order.upgrades = upgradesToSend;
    order.amountToPay = totalPayAmount;
    order.comments = comments;

    const result = await order.save();

    return res
      .status(200)
      .json({ message: 'Successfully updated order', order: result });
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
