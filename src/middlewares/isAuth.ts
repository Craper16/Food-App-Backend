import { RequestHandler } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { ErrorResponse } from '../app';

export const isAuth: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
      const error: ErrorResponse = {
        message: 'Unauthenticated',
        name: 'Unauthenticated',
        status: 401,
      };
      throw error;
    }

    const access_token = authHeader.split(' ')[1];

    let decodedToken;

    try {
      decodedToken = await verify(access_token, process.env.SECRET as string);
    } catch (error) {
      const { message, name } = error as Error;
      const thrownError: ErrorResponse = {
        message: message,
        name: name,
        status: 409,
      };
      throw thrownError;
    }

    if (!decodedToken) {
      const error: ErrorResponse = {
        message: 'Unauthorized',
        name: 'Unauthorized',
        status: 401,
      };
      throw error;
    }

    const { verifiedUserId } = decodedToken as JwtPayload;

    req.userId = verifiedUserId;
    next();
  } catch (error) {
    next(error);
  }
};
