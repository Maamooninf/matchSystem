import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Position } from "../entity/Position";

export const getAllpos = async (req: Request, res: Response) => {
  try {
    let positionRepo = getRepository(Position);
    const positions = await positionRepo.find();
    return res.status(200).send(positions);
  } catch (err) {
    return res.status(500).send({ err });
  }
};

export const getone = async (req: Request, res: Response) => {
  try {
    let positionRepo = getRepository(Position);
    const positions = await positionRepo.findOne(req.params.id);
    return res.status(200).send(positions);
  } catch (err) {
    return res.status(500).send({ err });
  }
};

export const createPos = async (req: Request, res: Response) => {
  try {
    let positionRepo = getRepository(Position);
    let pos = new Position();
    pos.name = req.body.name;
    let result = await positionRepo.save(pos);
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ err });
  }
};

export const updatePos = async (req: Request, res: Response) => {
  try {
    let positionRepo = getRepository(Position);
    let idpo = parseInt(req.params.id);
    await positionRepo.update({ id: idpo }, req.body);
    return res.redirect(303, `/position/getone/${idpo}`);
  } catch (err) {
    return res.status(500).send({ err });
  }
};
