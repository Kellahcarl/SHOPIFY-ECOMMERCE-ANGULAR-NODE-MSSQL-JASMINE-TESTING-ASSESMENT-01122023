import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

import jwt from "jsonwebtoken";
import { checkDetailsUser, extendedUser, user } from "../types/userInterfaces";


export const verifyToken = (
  req: extendedUser,
  res: Response,
  next: NextFunction
) => {
  // try {
  //   const token = req.headers["token"] as string;
  //   if (!token) {
  //     return res.status(401).json({
  //       message: "No token provided",
  //     });
  //   }
  //   const decoded = jwt.verify(
  //     token,
  //     process.env.SECRET_KEY as string
  //   ) as checkDetailsUser
      
  //     ;
    
  //   req.user = decoded;
  // } catch (error) {
  //   return res.json((error as Error).message);
  // }

  next();
};
