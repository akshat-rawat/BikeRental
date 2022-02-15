import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bike' })
export default class Bike extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() model: string;
  @Column() color: string;
  @Column() location: string;
  @Column({ default: false }) isAvailable: boolean;
  @Column() avgRating: number;
}
