import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Bike from './bike';

@Entity({ name: 'reservation' })
export default class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() fromDateTime: string;
  @Column() toDateTime: string;
  @Column() userId: number;
  @Column() bikeId: number;
  @Column() status: "active" | "cancel";
  
  @ManyToOne(() => Bike)
  @JoinColumn({ name: 'bikeId', referencedColumnName: 'id' })
  bike: Bike;
}
