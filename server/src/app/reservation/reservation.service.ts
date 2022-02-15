import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import Reservation from '../../db/entity/reservation';
import User from '../../db/entity/user';
import { PageSize } from '../util';
import { FindCondition } from 'typeorm';
import Rating from '../../db/entity/rating';
import Bike from '../../db/entity/bike';

@Injectable()
export default class ReservationService {
  async getAllReservations({ page, userId, bikeId }, authUser: User) {
    page = Math.max(Number(page) || 1, 1);
    const where: FindCondition<Reservation> = {};
    if (authUser.isManager) {
      if (bikeId) where.bikeId = bikeId;
      if (userId) where.userId = userId;
      if (!bikeId && !userId) where.userId = authUser.id;
    } else {
      where.userId = authUser.id;
    }

    const reservations = await Reservation.find({
      where,
      relations: ['bike'],
      take: PageSize,
      skip: (page - 1) * PageSize,
    });

    const ratings = await Rating.find({ userId: authUser.id });
    // { bikeId : true } for user to check if user has rated or not
    const ratingMap = ratings.reduce((acc, rating) => {
      acc[rating.reservationId] = rating.rating;
      return acc;
    });

    reservations.map((reservation) => {
      // @ts-ignore
      reservation.userRating = ratingMap[reservation.id];
    });

    const reservationCount = await Reservation.count({ where });
    const pageCount = Math.ceil(reservationCount / PageSize);
    return { reservations, page, pageCount };
  }

  async cancelReservation(reservationId: string, authUser: User) {
    const reservation = await Reservation.findOne({
      where: {
        id: reservationId,
        userId: authUser.id,
      },
    });
    if (reservation) {
      if (reservation.status === 'cancel')
        throw new HttpException('Reservation is already cancelled', 400);
      reservation.status = 'cancel';
      await reservation.save();
      return {};
    } else throw new NotFoundException();
  }

  async addRating({ reservationId, rate }, authUser: User) {
    const res = await Reservation.findOne(reservationId);
    if (res) {
      const { bikeId } = res;
      let rating = await Rating.findOne({
        where: {
          bikeId,
          reservationId,
          userId: authUser.id,
        },
      });
      if (rating) {
        throw new HttpException(
          'You have already rated for this reservation',
          400,
        );
      } else {
        rating = new Rating();
        rating.userId = authUser.id;
        rating.bikeId = res.bikeId;
        rating.reservationId = res.id;
        rating.rating = rate;
        await rate.save();
        await this.updateBikeRating(res.bikeId);
        return rating;
      }
    } else throw new NotFoundException();
  }

  async updateBikeRating(bikeId: number) {
    const bike = await Bike.findOne(bikeId);
    const ratings = await Rating.find({ where: { bikeId } });
    const totalRatings = ratings.reduce(
      (totalRating, review) => review.rating + totalRating,
      0,
    );
    bike.avgRating =
      ratings.length === 0
        ? 0
        : Number(Number(totalRatings / ratings.length).toFixed(2));
    await bike.save();
  }
}
