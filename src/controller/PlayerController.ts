import { Player } from "../entity/Player";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Position } from "../entity/Position";
import { PlayerMPos } from "../entity/PlayerMatchPos";
import { Match } from "../entity/Match";
import { Team } from "../entity/Team";

export const getAllPlayers = async (req: Request, res: Response) => {
  try {
    let playerRepo = getRepository(Player);
    const players = await playerRepo.find({ relations: ["position", "team"] });
    return res.status(200).send(players);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    let playerRepo = getRepository(Player);
    const player = await playerRepo.findOne(req.params.playerid, {
      relations: ["position", "team"],
    });
    return res.status(200).send(player);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const createPlayer = async (req: Request, res: Response) => {
  try {
    let playerRepo = getRepository(Player);
    let posRepo = getRepository(Position);
    let team = await getRepository(Team).findOne(req.body.team);
    let pos = await posRepo.findOne(req.body.position);
    if (pos && team) {
      let player = new Player();
      player.name = req.body.name;
      player.position = pos;
      player.team = team;
      let pl = await playerRepo.save(player);
      return res.status(200).send(pl);
    } else if (pos) {
      let player = new Player();
      player.name = req.body.name;
      player.position = pos;
      let pl = await playerRepo.save(player);
      return res.status(200).send(pl);
    }
    return res.status(404).send({ err: "position not found!" });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const updateplayer = async (req: Request, res: Response) => {
  try {
    let idpl = parseInt(req.params.playerid);
    let playerRepo = getRepository(Player);
    await playerRepo.update({ id: idpl }, req.body);
    return res.redirect(303, `/player/getone/${idpl}`);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const addMatchandpos = async (req: Request, res: Response) => {
  try {
    let idpl = req.body.player;
    let playerRepo = getRepository(Player);
    let PosRepo = getRepository(Position);
    let MatchRepo = getRepository(Match);
    let JuncRep = getRepository(PlayerMPos);
    const [player, match, position] = await Promise.all([
      playerRepo.findOne(idpl),
      MatchRepo.findOne(req.body.match),
      PosRepo.findOne(req.body.position),
    ]);
    let junc = new PlayerMPos();
    if (player && match && position) {
      junc.player = player;
      junc.match = match;
      junc.pos = position;
      junc = await JuncRep.save(junc);
      return res.status(200).send(junc);
    } else {
      return res.status(404).send({ err: "some prop is not found" });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};
