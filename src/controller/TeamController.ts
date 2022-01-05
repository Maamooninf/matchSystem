import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Team } from "../entity/Team";

export const getAllteams = async (req: Request, res: Response) => {
  try {
    let teamRepo = getRepository(Team);
    const teams = await teamRepo.find();
    return res.status(200).send(teams);
  } catch (err) {
    return res.status(500).send({ err });
  }
};

export const getone = async (req: Request, res: Response) => {
  try {
    let teamRepo = getRepository(Team);
    const team = await teamRepo.findOne(req.params.id);
    return res.status(200).send(team);
  } catch (err) {
    return res.status(500).send({ err });
  }
};

export const createTeam = async (req: Request, res: Response) => {
  try {
    let teamRepo = getRepository(Team);

    let team = new Team();
    team.name = req.body.name;
    let result = await teamRepo.save(team);
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ err });
  }
};
