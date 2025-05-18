import { AuthRequest } from "../types";
import { NextFunction, Response } from "express";
import ServerResponse from "../utils/ServerResponse";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma-client";

export const checkLoggedIn: any = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return ServerResponse.unauthenticated(res, "You are not logged in");
    const response = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
      {}
    );
    if (!response)
      return ServerResponse.unauthenticated(res, "You are not logged in");
    req.user = { id: (response as any).id };
    next();
  } catch (error) {
    return ServerResponse.error(res, "Internal server error 500.");
  }
};

export const checkAdmin: any = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return ServerResponse.unauthenticated(res, "You are not logged in");

    const response = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
      {}
    );
    if (!response) {
      return ServerResponse.unauthenticated(
        res,
        "You are not logged in"
      );
    }
    const user = await prisma.user.findUnique({
      where: { id: (response as any).id },
    });
    if (!user) return ServerResponse.unauthorized(res, "You are not logged in");

    if (user.role != "ADMIN") {
      return ServerResponse.unauthorized(
        res,
        "You do not have admin privileges"
      );
    }

    req.user = { id: user.id };
    next();
  } catch (error: any) {
    console.log(error);
    return ServerResponse.error(res, "Internal server error 500.");
  }
};
