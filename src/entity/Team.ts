import { Entity, Column, PrimaryGeneratedColumn, OneToMany  } from "typeorm";
import { Player } from "./Player";
import {Match} from './Match'
@Entity()
export  class Team{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(type => Player, player => player.team,{cascade:true})
    players:Player[]

    @OneToMany(type => Match, match => match.teamone)
    matchesone:Match[]


     @OneToMany(type => Match, match => match.teamtwo)
     matchestwo:Match[]

}