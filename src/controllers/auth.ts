import e, { RequestHandler } from 'express';
import { User, UserModel } from '../models/user';

import { hash, compare } from 'bcryptjs';
import { Jwt, JwtPayload, sign, verify } from 'jsonwebtoken';
import { ErrorResponse } from '../app';

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phoneNumber } =
      req.body as UserModel;

    let user = await User.findOne({ email: email });

    if (user) {
      const error: ErrorResponse = {
        message: 'An account with this email already exists',
        name: 'Already exists',
        status: 403,
      };
      throw error;
    }

    const hashedPassword: string = await hash(password, 12);

    user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
    });

    const result = await user.save();

    const access_token = sign(
      {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        userId: result._id.toString(),
      },
      process.env.SECRET!,
      { expiresIn: '1hr' }
    );

    const refresh_token = sign(
      {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        userId: result._id.toString(),
      },
      process.env.SECRET!,
      { expiresIn: '365d' }
    );

    return res.status(201).json({
      message: 'Signup Successful',
      access_token: access_token,
      refresh_token: refresh_token,
    });
  } catch (error) {
    next(error);
  }
};

export const signin: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body as UserModel;
    const user = await User.findOne({ email: email });

    if (!user) {
      const error: ErrorResponse = {
        message: 'Please check your email and password and try again',
        name: 'Unauthorized',
        status: 401,
      };
      throw error;
    }

    const loadedUser = user;

    const isEqual = await compare(password, user.password);

    if (!isEqual) {
      const error: ErrorResponse = {
        message: 'Please check your email and password and try again',
        status: 401,
        name: 'Unauthorized',
      };
      throw error;
    }

    const access_token = sign(
      {
        email: loadedUser.email,
        firstName: loadedUser.firstName,
        lastName: loadedUser.lastName,
        phoneNumber: loadedUser.phoneNumber,
        userId: loadedUser._id.toString(),
      },
      process.env.SECRET!,
      { expiresIn: '1h' }
    );

    const refresh_token = sign(
      {
        email: loadedUser.email,
        firstName: loadedUser.firstName,
        lastName: loadedUser.lastName,
        phoneNumber: loadedUser.phoneNumber,
        userId: loadedUser._id.toString(),
      },
      process.env.SECRET!,
      { expiresIn: '365d' }
    );

    return res.status(200).json({
      access_token: access_token,
      refresh_token: refresh_token,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken: RequestHandler = async (req, res, next) => {
  try {
    const { refresh_token } = req.body as { refresh_token: string };

    if (!refresh_token) {
      const error: ErrorResponse = {
        message: 'Unauthorized',
        name: 'Unauthorized',
        status: 401,
      };
      throw error;
    }

    await verify(
      refresh_token,
      process.env.SECRET as string,
      (error, decoded) => {
        if (error) {
          const error: ErrorResponse = {
            message: 'Unauthorized',
            name: 'Unauthorized',
            status: 401,
          };
          throw error;
        }

        const { email, firstName, lastName, phoneNumber, userId } =
          decoded as JwtPayload;

        const access_token = sign(
          {
            email: email,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            userId: userId,
          },
          process.env.SECRET as string,
          {
            expiresIn: '1hr',
          }
        );

        return res.status(200).json({ access_token: access_token });
      }
    );
  } catch (error) {
    next(error);
  }
};

export const getUserData: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      const error: ErrorResponse = {
        message: 'User not found unauthorized',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }

    const {
      email,
      firstName,
      lastName,
      phoneNumber,
      address,
      orders,
      lifetimeAmountPaid,
    } = user;

    return res.status(200).json({
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      address: address,
      orders: orders,
      lifetimeAmountPaid: lifetimeAmountPaid,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserOrders: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      const error: ErrorResponse = {
        message: 'User not found',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }

    const { orders } = user;

    return res.status(200).json({ orders: orders });
  } catch (error) {
    next(error);
  }
};

export const changeUserPassword: RequestHandler = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body as {
      oldPassword: string;
      newPassword: string;
    };

    const user = await User.findById(req.userId);

    if (!user) {
      const error: ErrorResponse = {
        message: 'User not found',
        name: 'Not found',
        status: 404,
      };
      throw error;
    }

    const isEqual = await compare(oldPassword, user.password);

    if (!isEqual) {
      const error: ErrorResponse = {
        message: 'Incorrect password entered',
        name: 'Forbidden',
        status: 403,
      };
      throw error;
    }

    const hashedPassword = await hash(newPassword, 12);

    user.password = hashedPassword;

    const result = await user.save();

    return res.status(200).json({
      message: 'Password changed successfully',
      user: result.email,
    });
  } catch (error) {
    next(error);
  }
};
