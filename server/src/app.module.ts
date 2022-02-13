import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import User from './db/entity/user';
import Bike from './db/entity/bike';
import Reservation from './db/entity/reservation';

import BikesController from './app/bike/bike.controller';
import BikeService from './app/bike/bike.service';
import UserController from './app/user/user.controller';
import UserService from './app/user/user.service';
import ReservationController from './app/reservation/reservation.controller';
import ReservationService from './app/reservation/reservation.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.db',
      entities: [Bike, User, Reservation],
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController, BikesController, UserController, ReservationController],
  providers: [AppService, BikeService, UserService, ReservationService],
})
export class AppModule {}
