import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";
import { validate } from "class-validator";
import bcrypt from "bcryptjs";
import { hashword } from "../config/establish";
export const Signincont = async (req: Request, res: Response) => {
  try {
    const user = req.body as User;
    const UserRepo = getRepository(User);
    let result = (await UserRepo.findOne({ username: user.username })) as User;
    if (!result) {
      return res.status(404).send({ msg: "user dose not exits" });
    } else {
      if (user.password === undefined) user.password = "";
      const match = await bcrypt.compare(user.password, result.password);
      console.log(hashword);
      if (match && user.password) {
        jwt.sign(
          { id: result.id, isAdmin: result.isAdmin },
          hashword,
          { expiresIn: "48h" },
          (err, token) => {
            if (err) {
              return res.status(402).send({ msg: "error in token" });
            } else {
              return res.status(200).send({
                token,
              });
            }
          }
        );
      } else {
        return res.status(402).send({ msg: "user not found" });
      }
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const Signupcont = (req: Request, res: Response) => {
  try {
    const UserRepo = getRepository(User);
    var { password, confirmpass, username, isAdmin } = req.body;

    var errpass: string = "";
    var errex: string = "";
    if (password !== confirmpass) {
      errpass = "password and confirme are not the same";
    }
    UserRepo.findOne({ username: username })
      .then(async (found) => {
        if (found) {
          errex = "user already exists";
        }
        if (errex !== "" || errpass !== "") {
          return res.status(402).send({ errex, errpass });
        }
        let user = new User();
        user.isAdmin = isAdmin;
        user.username = username;
        user.password = password;
        var errors: Array<any> = await validate(user);
        if (errors.length === 0) {
          await UserRepo.insert(user);
          return res.status(200).send({ msg: "Successfully sign up" });
        } else {
          return res.status(402).send({ errors });
        }
      })
      .catch((err) => {
        return res.status(402).send(err);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};
