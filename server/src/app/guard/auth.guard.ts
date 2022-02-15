import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { decryptJwt } from '../util';

export default class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwt = request.headers?.jwt;
    const user = await decryptJwt(jwt);
    console.log(user, "hey", jwt);
    if (user) {
      request.user = user;
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}
