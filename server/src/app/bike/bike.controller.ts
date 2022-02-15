import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import ManagerGuard from '../guard/manager.guard';
import AuthGuard from '../guard/auth.guard';
import { bikeValidate, ratingValidate, reservationValidate } from '../validator';
import BikeService from './bike.service';

@Controller('bike')
export default class BikeController {
  constructor(private readonly bikeService: BikeService) {}

  @UseGuards(ManagerGuard)
  @Post('/')
  addBike(@Body() body: Record<string, unknown>) {
    const { model, color, location, isAvailable } = bikeValidate(body);
    return this.bikeService.addBike({ model, color, location, isAvailable });
  }

  @UseGuards(AuthGuard)
  @Get('/')
  getBikes(@Query('page') page = '1') {
      return this.bikeService.getBikes(page);
  }
  
  @UseGuards(ManagerGuard)
  @Put('/:id')
  updateBike(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    const { model, color, location, isAvailable } = bikeValidate(body);
    return this.bikeService.updateBike(id, { model, color, location, isAvailable });
  }
  
  @UseGuards(ManagerGuard)
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.bikeService.deleteBike(id);
  }

  @UseGuards(AuthGuard)
  @Post('/book')
  addReservation(@Body() body: Record<string, unknown>, @Req() req: any) { 
    const { bikeId, fromDateTime, toDateTime } = reservationValidate(body);
    return this.bikeService.addReservation({ bikeId, fromDateTime, toDateTime }, req.user);
  }

  @UseGuards(AuthGuard)
  @Post('/rate')
  addRating(@Body() body, @Req() req) {
    const { bikeId, rating } = ratingValidate(body);
    return this.bikeService.addRating({bikeId, rating}, req.user);
  }
}
