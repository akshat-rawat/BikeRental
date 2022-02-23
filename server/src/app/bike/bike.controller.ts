import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import ManagerGuard from '../guard/manager.guard';
import AuthGuard from '../guard/auth.guard';
import {
  bikeValidate,
  getBikeValidate,
  reservationValidate,
} from '../validator';
import BikeService from './bike.service';
import * as moment from 'moment';

@Controller('bike')
export default class BikeController {
  constructor(private readonly bikeService: BikeService) {}

  @UseGuards(ManagerGuard)
  @Post('/')
  addBike(@Body() body) {
    const { model, color, location, isAvailable } = bikeValidate(body);
    return this.bikeService.addBike({ model, color, location, isAvailable });
  }

  @UseGuards(AuthGuard)
  @Get('/')
  getBikes(@Query() query, @Req() req) {
    const { page, color, model, location, rating, fromDateTime, toDateTime } =
      getBikeValidate(query);
    if (fromDateTime && toDateTime)
      this.validateFromAndToDate({ fromDateTime, toDateTime });
    return this.bikeService.getBikes(
      {
        page,
        color,
        model,
        location,
        rating,
        fromDateTime,
        toDateTime,
      },
      req.user,
    );
  }

  @UseGuards(ManagerGuard)
  @Put('/:id')
  updateBike(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    const { model, color, location, isAvailable } = bikeValidate(body);
    return this.bikeService.updateBike(id, {
      model,
      color,
      location,
      isAvailable,
    });
  }

  @UseGuards(ManagerGuard)
  @Delete('/:id')
  deleteBike(@Param('id') id: string) {
    return this.bikeService.deleteBike(id);
  }

  @UseGuards(AuthGuard)
  @Post('/book')
  addReservation(@Body() body: Record<string, unknown>, @Req() req: any) {
    const { bikeId, fromDateTime, toDateTime } = reservationValidate(body);
    this.validateFromAndToDate({ fromDateTime, toDateTime });
    return this.bikeService.addReservation(
      { bikeId, fromDateTime, toDateTime },
      req.user,
    );
  }

  validateFromAndToDate({ fromDateTime, toDateTime }) {
    if (!toDateTime || !fromDateTime)
      throw new HttpException('From data and to date both are required', 400);

      fromDateTime = moment(fromDateTime).format();
      toDateTime = moment(toDateTime).format();

      if (fromDateTime >= toDateTime)
      throw new HttpException("From date can't be more than to Date", 400);
    if (toDateTime < moment().format())
      throw new HttpException("Can't book bike for past date", 400);
  }
}
