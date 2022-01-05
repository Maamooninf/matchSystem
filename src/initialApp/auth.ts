import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import { hashword } from "../config/establish";
const isloggedin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    console.log(hashword);
    if (authorization) {
      const decoded = jwt.verify(authorization, hashword) as User;
      if (decoded && decoded.isAdmin) {
        req.user = decoded;

        next();
      } else {
        return res.status(401).json({ msg: "You are not authenticated!" });
      }
    } else {
      return res.status(401).json({ msg: "You need to login" });
    }
  } catch (err) {
    return res.status(401).json({ err });
  }
};
export { isloggedin };
