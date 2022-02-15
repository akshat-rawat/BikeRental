import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import User from './db/entity/user';
import Bike from './db/entity/bike';
import Reservation from './db/entity/reservation';

import BikeController from './app/bike/bike.controller';
import BikeService from './app/bike/bike.service';
import UserController from './app/user/user.controller';
import UserService from './app/user/user.service';
import ReservationController from './app/reservation/reservation.controller';
import ReservationService from './app/reservation/reservation.service';
import Rating from './db/entity/rating';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.db',
      entities: [Bike, User, Reservation, Rating],
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [
    AppController,
    BikeController,
    UserController,
    ReservationController,
  ],
  providers: [AppService, BikeService, UserService, ReservationService],
})
export class AppModule {}
