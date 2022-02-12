import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() email: string;
  @Column() password: string;
  @Column() name: string;
  @Column({ default: false }) isManager: boolean;
}
