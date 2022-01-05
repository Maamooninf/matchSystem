import { Entity, Column,PrimaryGeneratedColumn,ManyToOne,OneToMany} from "typeorm";
import { PlayerMPos } from "./PlayerMatchPos";
import { Team } from "./Team";
import {IsDateString} from 'class-validator'
@Entity()
export  class Match {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(()=>Team,team=>team.matchesone,{ nullable: false})
    teamone:Team
    @ManyToOne(()=>Team,team=>team.matchestwo,{ nullable: false})
    teamtwo:Team
    @Column({type:'date'})
    @IsDateString({ message: '$property must be a Date type' })
    date:string
     @OneToMany(()=>PlayerMPos,playmatchpos=>playmatchpos.match)
     playmatchposes:PlayerMPos[]
}

