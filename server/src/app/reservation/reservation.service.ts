import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import Reservation from '../../db/entity/reservation';
import User from '../../db/entity/user';
import { PageSize } from '../util';

@Injectable()
export default class ReservationService {
  async getAllReservations(reqPage: string) {
    const page = Math.max(Number(reqPage) || 1, 1);
    const reservations = await Reservation.find({
      relations: ['bike'],
      take: PageSize,
      skip: (page - 1) * PageSize,
    });

    const reservationCount = await Reservation.count({});
    const pageCount = Math.ceil(reservationCount / PageSize);
    return { reservations, page, pageCount };
  }

  async getUserReservations(reqPage: string, authUser: User) {
    const page = Math.max(Number(reqPage) || 1, 1);
    const reservations = await Reservation.find({
      relations: ['bike'],
      take: PageSize,
      skip: (page - 1) * PageSize,
      where: { id: authUser.id },
    });

    const reservationCount = await Reservation.count({});
    const pageCount = Math.ceil(reservationCount / PageSize);
    return { reservations, page, pageCount };
  }

  async deleteReservation(id: string, authUser: User) {
    const reservation = await Reservation.findOne(id);
    if (reservation) {
      if (reservation.userId === authUser.id || authUser.isManager) {
        await Reservation.delete(id);
        return {};
      } else throw new HttpException('Permission denied', 403);
    } else throw new NotFoundException();
  }
}
