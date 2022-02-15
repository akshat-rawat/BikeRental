import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import * as Bcrypt from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';

import User from '../../db/entity/user';
import { JWT_SECRET_KEY, PageSize } from '../util';

@Injectable()
export default class UserService {
  async login({ password, email }) {
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (user) {
      if (Bcrypt.compareSync(password, user.password)) {
        return {
          ...user,
          password: undefined,
          jwt: Jwt.sign({ id: user.id }, JWT_SECRET_KEY, { expiresIn: '1d' }),
        };
      } else throw new HttpException('Email and password did not match', 400);
    } else throw new HttpException('Email and password did not match', 400);
  }

  async signup({ password, name, email }) {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (!existingUser) {
      const user = new User();
      user.email = email.toLowerCase();
      user.password = Bcrypt.hashSync(password, 10);
      user.name = name;
      await user.save();
      return user;
    } else throw new HttpException('User already exists with same email', 400);
  }

  async addUser({ email, password, name, isManager }) {
    const signupUser = await this.signup({ email, password, name });
    const user = await User.findOne(signupUser.id);
    user.isManager = isManager;
    await user.save();
    return user;
  }

  async getUsers(reqPage: string) {
    const page = Math.max(Number(reqPage) || 1, 1);
    const users = await User.find({
      take: PageSize,
      skip: (page - 1) * PageSize,
    });

    const userCount = await User.count({});
    const pageCount = Math.ceil(userCount / PageSize);
    return { users, page, pageCount };
  }

  async updateUser(id: string, { name, email, isManager, password }) {
    const user = await User.findOne(id);
    if (user) {
      user.name = name;
      user.email = email.toLowerCase();
      user.isManager = isManager;
      user.password = Bcrypt.hashSync(password, 10);
      await user.save();
      return user;
    } else throw new NotFoundException();
  }

  async deleteUser(id: string) {
    const user = await User.findOne(id);
    if (user) {
      await User.delete(id);
      return {};
    } else throw new NotFoundException();
  }
}
