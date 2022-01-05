import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Length } from "class-validator";

import { Player } from "./Player";
import { PlayerMPos } from "./PlayerMatchPos";
@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany((type) => Player, (player) => player.position, { cascade: true })
  players: Player[];

  @OneToMany(() => PlayerMPos, (playmatchpos) => playmatchpos.pos)
  playmatchposes: PlayerMPos[];
}
