import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import ManagerGuard from '../guard/manager.guard';
import AuthGuard from '../guard/auth.guard';
import { bikeSchema } from '../validator';
import BikeService from './bike.service';

@Controller('bike')
export default class BikesController {
  constructor(private readonly bikeService: BikeService) {}

  @UseGuards(ManagerGuard)
  @Post('/')
  addBike(@Body() body: Record<string, unknown>) {
    const { model, color, location, isAvailable } = bikeSchema(body);
    return this.bikeService.addBike({ model, color, location, isAvailable });
  }

  @UseGuards(AuthGuard)
  @Get('/')
  getBikes(@Query('page') page = '1') {
      this.bikeService.getBikes(page);
  }
  
  @UseGuards(ManagerGuard)
  @Put('/:id')
  updateBike(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    const { model, color, location, isAvailable } = bikeSchema(body);
    return this.bikeService.updateBike(id, { model, color, location, isAvailable });
  }
  
  @UseGuards(ManagerGuard)
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.bikeService.deleteBike(id);
  }
}
