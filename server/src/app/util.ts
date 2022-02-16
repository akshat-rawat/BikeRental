import * as Jwt from 'jsonwebtoken';
import User from '../db/entity/user';

export const JWT_SECRET_KEY = 'iuweydhj30qf9gqy3dj32hu4i';

export const decryptJwt = async (jwt: string) => {
  try {
    const { id } = Jwt.verify(jwt, JWT_SECRET_KEY);
    const user = await User.findOne(id);
    return user;
  } catch (e) {
    return undefined;
  }
};


export const PageSize = 10;