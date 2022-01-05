import { Match } from "../entity/Match";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

export const getMatches = async (req: Request, res: Response) => {
  try {
    const matchRepository = getRepository(Match);

    let matchs = await matchRepository.find({
      relations: ["teamone", "teamtwo"],
    });
    return res.status(200).send(matchs);
  } catch (err) {
    return res.status(500).send({ err });
  }
};

export const getOneMatch = async (req: Request, res: Response) => {
  try {
    const matchRepository = getRepository(Match);

    let matchs = await matchRepository.findOne(req.params.id, {
      relations: ["teamone", "teamtwo"],
    });
    return res.status(200).send(matchs);
  } catch (err) {
    return res.status(500).send({ err });
  }
};

export const createMatch = async (req: Request, res: Response) => {
  try {
    const matchRepository = getRepository(Match);
    let match = new Match();
    match.date = req.body.date;
    match.teamone = req.body.teamone;
    match.teamtwo = req.body.teamtwo;

    var errors: Array<any> = await validate(match);

    if (errors?.length === 0) {
      let d = new Date(match.date);
      match.date = d.toISOString();
      let m = await matchRepository.save(match);
      return res.status(200).send(m);
    } else {
      return res.status(400).send(errors);
    }
  } catch (err) {
    return res.status(500).send({ err });
  }
};

export const updateMatch = async (req: Request, res: Response) => {
  try {
    let idma = parseInt(req.params.id);
    let matchRepo = getRepository(Match);
    await matchRepo.update({ id: idma }, req.body);

    return res.redirect(303, `/match/getone/${idma}`);
  } catch (err) {
    return res.status(500).send(err);
  }
};
