import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import AuthGuard from '../guard/auth.guard';
import ReservationService from './reservation.service';
import { ratingValidate } from '../validator';

@Controller('reservation')
export default class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  getReservations(@Query() { page = '1', bikeId, userId }, @Req() req) {
    return this.reservationService.getAllReservations(
      { page, bikeId, userId },
      req.user,
    );
  }

  @UseGuards(AuthGuard)
  @Put('/:id/cancel')
  deleteReservation(@Param('id') reservationId: string, @Req() req: any) {
    return this.reservationService.cancelReservation(reservationId, req.user);
  }

  @UseGuards(AuthGuard)
  @Post('/:id/rate/:rate')
  addRating(@Param() params, @Req() req) {
    const { id, rate } = ratingValidate(params);
    return this.reservationService.addRating(
      { reservationId: id, rate },
      req.user,
    );
  }
}
