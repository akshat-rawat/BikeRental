import * as Jwt from 'jsonwebtoken';
import User from '../db/entity/user';

const JWT_SECRET_KEY = 'iuweydhj30qf9gqy3dj32hu4i';

export const decryptJwt = async (jwt) => {
  try {
    const { userId } = Jwt.verify(jwt, JWT_SECRET_KEY);
    const user = await User.findOne(userId);
  } catch (e) {
    return undefined;
  }
};
