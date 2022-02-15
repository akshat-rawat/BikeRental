import {
  Body,
  Controller,
  Get,
  Delete,
  Param,
  Post,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import UserService from './user.service';
import { loginValidate, signupValidate, userValidate } from '../validator';
import ManagerGuard from '../guard/manager.guard';

@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  login(@Body() body: Record<string, unknown>) {
    const { email, password } = loginValidate(body);
    return this.userService.login({ email, password });
  }

  @Post('/signup')
  signup(@Body() body: Record<string, unknown>) {
    const { email, password, name } = signupValidate(body);
    return this.userService.signup({ email, password, name });
  }

  @UseGuards(ManagerGuard)
  @Post('/')
  addUser(@Body() body: Record<string, unknown>) {
    const { name, email, password, isManager } = userValidate(body);
    return this.userService.addUser({ email, password, name, isManager });
  }

  @UseGuards(ManagerGuard)
  @Get('/')
  getUsers(@Query('page') page = '1') {
    return this.userService.getUsers(page);
  }

  @UseGuards(ManagerGuard)
  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    const { name, email, password, isManager } = userValidate(body);
    return this.userService.updateUser(id, {
      email,
      password,
      name,
      isManager,
    });
  }

  @UseGuards(ManagerGuard)
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
