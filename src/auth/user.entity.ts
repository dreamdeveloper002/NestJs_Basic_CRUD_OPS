import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";



@Entity()
@Unique(['username', 'mail'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  mail: string;

  @Column()
  password: string;
}