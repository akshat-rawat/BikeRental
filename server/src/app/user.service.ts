import { HttpException, Injectable } from '@nestjs/common';
import User from '../db/entity/user';
import * as Bcrypt from 'bcryptjs';

@Injectable()
export default class UserService {
  async signup({ password, name, email }) {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (!existingUser) {
      const user = new User();
      user.email = email.toLowerCase();
      user.password = Bcrypt.hashSync(password, 10);
      user.name = name;
      await user.save();
      return {};
    } else throw new HttpException('User already exists with same email', 400);
  }

  deleteUser(id: string, authUser: User) {}
}
