import { Injectable, NotFoundException } from '@nestjs/common';
import Bike from 'src/db/entity/bike';
import Reservation from 'src/db/entity/reservation';
import { PageSize } from '../util';

@Injectable()
export default class BikeService {
  async addBike({ model, color, location, isAvailable }) {
    const bike = new Bike();
    bike.model = model;
    bike.color = color;
    bike.location = location;
    bike.isAvailable = isAvailable;
    await bike.save();
    return bike;
  }

  async getBikes(reqPage: string) {
    const page = Math.max(Number(reqPage) || 1, 1);
    const bikes = await Bike.find({
      take: PageSize,
      skip: (page - 1) * PageSize,
    });

    const bikeCount = await Bike.count({});
    const pageCount = Math.ceil(bikeCount / PageSize);
    return { bikes, page, pageCount };
  }

  async updateBike(id: string, { model, color, location, isAvailable }) {
    const bike = await Bike.findOne(id);
    if (bike) {
      bike.model = model;
      bike.color = color;
      bike.location = location;
      bike.isAvailable = isAvailable;
      await bike.save();
      return bike;
    } else throw new NotFoundException();
  }

  async deleteBike(id: string) {
    const bike = await Bike.findOne(id);
    if (bike) {
      await Bike.delete(id);
      return {};
    }
    throw new NotFoundException();
  }

  async addReservation(id, authUser, { fromDateTime, toDateTime }) {
    const reservation = new Reservation();
    reservation.bikeId = id;
    reservation.userId = authUser.id;
    reservation.fromDateTime = fromDateTime;
    reservation.toDateTime = toDateTime;
    await reservation.save();
    return reservation;
  }
}
