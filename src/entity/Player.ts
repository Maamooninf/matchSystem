import { Length } from "class-validator";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { PlayerMPos } from "./PlayerMatchPos";
import { Position } from "./Position";
import { Team } from "./Team";
@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @Length(3, 10)
  name!: string;
  @ManyToOne((type) => Position, (position) => position.players, {
    nullable: false,
  })
  position: Position;

  @ManyToOne((type) => Team, (team) => team.players)
  team: Team;

  @OneToMany(() => PlayerMPos, (playmatchpos) => playmatchpos.player)
  playmatchposes: PlayerMPos[];
}
