import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import UserService from './user.service';
import { signupSchema } from './validator';
import AuthGuard from './guard/auth.guard';
import ManagerGuard from './guard/manager.guard';
import User from '../db/entity/user';

@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  login() {}

  @Post('/signup')
  signup(@Body() body) {
    const { email, password, name } = signupSchema(body);
    return this.userService.signup({ email, password, name });
  }

  addUser() {}

  getUsers() {}

  updateUser() {}

  @UseGuards(ManagerGuard)
  @Delete('/:id')
  deleteUser(@Param('id') id: string, @Req() req) {
    const authUser: User = req.user;
    this.userService.deleteUser(id, authUser);
  }
}
