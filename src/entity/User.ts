import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { degree } from "../config/establish";
import bcrypt from "bcryptjs";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @IsEmail()
  @Column()
  username: string;
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "password should contain at lease one uppercase one lowercase one digit ",
  })
  @Column()
  password: string;
  @Column("boolean", { default: false })
  isAdmin: boolean = false;

  @BeforeInsert()
  async beforeInsert() {
    this.password = await bcrypt.hash(this.password, degree);
  }
}
