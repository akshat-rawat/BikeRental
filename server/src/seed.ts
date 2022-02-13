import * as Bcryptjs from 'bcryptjs';
import * as moment from 'moment';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import User from './db/entity/user';
import Bike from './db/entity/bike';
import Reservation from './db/entity/reservation';

(async function () {
  const app = await NestFactory.createApplicationContext(AppModule);
  await User.delete({});
  await Bike.delete({});
  await Reservation.delete({});

  const manager = new User();
  manager.id = 1;
  manager.name = 'Manager';
  manager.email = 'manager@email.com';
  manager.password = Bcryptjs.hashSync('1234', 10);
  manager.isManager = true;
  await manager.save();

  const regular = new User();
  regular.id = 2;
  regular.name = 'Regular User';
  regular.email = 'regular@email.com';
  regular.password = Bcryptjs.hashSync('1234', 10);
  regular.isManager = false;
  await regular.save();

  for (let i = 1; i < 25; i++) {
    const bike = new Bike();
    bike.id = i;
    bike.model = `Model ${i}`;
    bike.color = `Color ${i}`;
    bike.location = `Location ${i}`;
    bike.isAvailable = Math.random() >= 0.5;
    await bike.save();
  }

  for (let i = 1; i < 15; i++) {
    const reservation = new Reservation();
    reservation.userId = Math.random() >= 0.5 ? manager.id : regular.id;
    reservation.bikeId = Math.floor(Math.random() * 24) + 1;
    const randomDay = Math.floor(Math.random() * 10);
    reservation.fromDateTime = moment()
      .subtract(randomDay, 'day')
      .format('YYYY-MM-DD');
    reservation.toDateTime = moment()
      .add(randomDay, 'day')
      .format('YYYY-MM-DD');
    await reservation.save();
  }
  await app.close();
})();
