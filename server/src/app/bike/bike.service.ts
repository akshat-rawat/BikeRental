import { Injectable, NotFoundException } from '@nestjs/common';
import Rating from '../../db/entity/rating';
import User from '../../db/entity/user';
import Bike from '../../db/entity/bike';
import Reservation from '../../db/entity/reservation';
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

  async addReservation({ bikeId, fromDateTime, toDateTime }, authUser) {
    const bike = await Bike.findOne(bikeId);
    if (bike) {
      const reservation = new Reservation();
      reservation.bikeId = bikeId;
      reservation.userId = authUser.id;
      reservation.fromDateTime = fromDateTime;
      reservation.toDateTime = toDateTime;
      await reservation.save();
      return reservation;
    }
    throw new NotFoundException();
  }

  async updateBikeRating(bikeId: number) {
    const bike = await Bike.findOne(bikeId);

    const ratings = await Rating.find({ where: { bikeId } });
    if (ratings.length === 0) {
      bike.avgRating = 0;
      await bike.save();
      return bike;
    }

    const totalRatings = ratings.reduce(
      (totalRating, review) => review.rating + totalRating,
      0,
    );

    const avgRating = Number(Number(totalRatings / ratings.length).toFixed(2));
    bike.avgRating = avgRating;
    console.log(avgRating, ratings);
    await bike.save();
  }

  async addRating({ bikeId, rating }, authUser: User) {
    const rate = await Rating.findOne({
      where: { userId: authUser.id, bikeId },
    });

    if (rate) {
      rate.rating = rating;
      await rate.save();
    } else {
      const newRating = new Rating();
      newRating.bikeId = bikeId;
      newRating.rating = rating;
      newRating.userId = authUser.id;
      await newRating.save();
    }

    this.updateBikeRating(bikeId);
  }
}
