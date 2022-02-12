import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'reservation' })
export default class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() fromDateTime: string;
  @Column() toDateTime: string;
  @Column() userId: number;
  @Column() bikeId: number;
}
