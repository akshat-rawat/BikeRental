import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';

import AuthGuard from '../guard/auth.guard';
import ManagerGuard from '../guard/manager.guard';
import ReservationService from './reservation.service';

@Controller('reservation')
export default class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(ManagerGuard)
  @Get('/all')
  getAllReservations(@Query('page') page = '1') {
    return this.reservationService.getAllReservations(page);
  }

  @UseGuards(AuthGuard)
  @Get('/user')
  getUserReservations(@Query('page') page = '1', @Req() req: any) {
    return this.reservationService.getUserReservations(page, req.user);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  deleteReservation(@Param('id') id: string, @Req() req: any) {
    return this.reservationService.deleteReservation(id, req.user);
  }
}
