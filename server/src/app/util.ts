import * as Jwt from 'jsonwebtoken';
import User from '../db/entity/user';

export const JWT_SECRET_KEY = 'iuweydhj30qf9gqy3dj32hu4i';

export const decryptJwt = async (jwt: string) => {
  try {
    const { id } = Jwt.verify(jwt, JWT_SECRET_KEY);
    return await User.findOne(id);
  } catch (e) {
    return undefined;
  }
};


export const PageSize = 10;