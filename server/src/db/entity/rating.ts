import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Bike from './bike';

@Entity({ name: 'rating' })
export default class Rating extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() userId: number;
  @Column() bikeId: number;
  @Column() rating: number;
  
  // @ManyToOne(() => Bike)
  // @JoinColumn({ name: 'bikeId', referencedColumnName: 'id' })
  // bike: Bike;
}
