import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const user = context.switchToHttp().getRequest<RequestWithUser>().user;
    const requiredRoles = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()]);
    if(!requiredRoles) return true
    return requiredRoles.some(role => role === user.role)
  }
}

interface RequestWithUser extends Request {
  user: {
    id: string;
    role: string;
  };
}
