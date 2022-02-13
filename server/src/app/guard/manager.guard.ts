import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { decryptJwt } from '../util';

export default class ManagerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwt = request.headers?.jwt;
    const user = await decryptJwt(jwt);
    if (user) {
      if (user.isManager) {
        request.user = user;
        return true;
      } else return false;
    } else {
      throw new UnauthorizedException();
    }
  }
}
