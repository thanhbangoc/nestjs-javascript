import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column("varchar")
  name = '';

  @Column("int")
  age = 0;

  @Column({type: 'json', array: true })
  sub = []
}
