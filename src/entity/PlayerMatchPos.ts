import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Match } from "./Match";
import { Player } from "./Player";
import { Position } from "./Position";
@Entity()
export class PlayerMPos {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Match, (match) => match.playmatchposes)
  match: Match;

  @ManyToOne(() => Player, (player) => player.playmatchposes)
  player: Player;

  @ManyToOne(() => Position, (pos) => pos.playmatchposes)
  pos: Position;
}
