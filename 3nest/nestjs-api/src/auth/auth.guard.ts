import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean { 
    try {
      const request = context.switchToHttp().getRequest<Request>();
      const token = this.extractTokenFromHeader(request);
      if(!token) throw new UnauthorizedException();
      const payload = this.jwtService.verify(token, { secret: 'secret' });
      request['user'] = payload;
      return true;
    } catch(e) {
      throw new UnauthorizedException();
    }
  }
  extractTokenFromHeader(request: Request) {
    const parts = request.headers.authorization.split(' ');
    if(parts.length !== 2) return;
    if(parts[0] !== 'Bearer') return;
    return parts[1];
  }
}
