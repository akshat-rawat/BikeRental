import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import User from '../../db/entity/user';
import Bike from '../../db/entity/bike';
import Reservation from '../../db/entity/reservation';
import { PageSize } from '../util';
import { FindCondition, getRepository, In, MoreThanOrEqual } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export default class BikeService {
  async addBike({ model, color, location, isAvailable }) {
    const bike = new Bike();
    bike.model = model.toLowerCase();
    bike.color = color.toLowerCase();
    bike.location = location.toLowerCase();
    bike.isAvailable = isAvailable;
    await bike.save();
    return bike;
  }

  async getBikes(
    { page, color, model, location, rating, fromDateTime, toDateTime },
    authUser: User,
  ) {
    page = Math.max(Number(page) || 1, 1);
    const whereClause: FindCondition<Bike> = {};
    if (color) whereClause.color = color.toLowerCase();
    if (model) whereClause.model = model.toLowerCase();
    if (location) whereClause.location = location.toLowerCase();
    if (rating) whereClause.avgRating = MoreThanOrEqual(rating);
    if (!authUser.isManager) whereClause.isAvailable = true;

    if (fromDateTime && toDateTime) {
      const nonBookedBikes: number[] = await this.getNonBookedBikes({
        fromDateTime: moment(fromDateTime).format(),
        toDateTime: moment(toDateTime).format(),
      });
      if (nonBookedBikes.length > 0)
        whereClause.id = In(nonBookedBikes);
    }
    let bikes = await Bike.find({
      where: whereClause,
      take: PageSize,
      skip: (page - 1) * PageSize,
    });
    const bikeCount = await Bike.count({ where: whereClause });
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
    fromDateTime = moment(fromDateTime).format();
    toDateTime = moment(toDateTime).format();
    const bikeIds = await this.getNonBookedBikes({ fromDateTime, toDateTime });
    if (!bikeIds.includes(bikeId))
      throw new HttpException('Bike is already booked', 405);
    const bike = await Bike.findOne(bikeId);
    if (bike) {
      const reservation = new Reservation();
      reservation.bikeId = bikeId;
      reservation.userId = authUser.id;
      reservation.fromDateTime = moment(fromDateTime).format();
      reservation.toDateTime = moment(toDateTime).format();
      reservation.status = 'active';
      await reservation.save();
      return reservation;
    }
    throw new NotFoundException();
  }

  private async getNonBookedBikes({
    fromDateTime,
    toDateTime,
  }): Promise<number[]> {
    const reservations = await getRepository(Reservation)
      .createQueryBuilder('res')
      .where(
        'res.status = :status and ((res.toDateTime between :fromDateTime and :toDateTime) or ' +
          '(res.fromDateTime between :fromDateTime and :toDateTime) or ' +
          '(res.fromDateTime < :fromDateTime and res.toDateTime > :toDateTime))',
        { fromDateTime, toDateTime, status: 'active' },
      )
      .getMany();
    const reservedBikeIds = reservations.map((r) => r.bikeId);
    const allBikes = await Bike.find({});
    const notBookedBikes = allBikes
      .filter((b) => !reservedBikeIds.includes(b.id))
      .map((b) => b.id);
    return notBookedBikes;
  }
}
