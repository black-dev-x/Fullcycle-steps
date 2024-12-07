import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log("can activate?")
    const user = context.switchToHttp().getRequest<RequestWithUser>().user;
    const requiredRoles = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()]);
    console.log(requiredRoles)
    if(!requiredRoles) return true
    console.log("Cai no console.log")
    return requiredRoles.some(role => role === user.role)
  }
}

interface RequestWithUser extends Request {
  user: {
    id: string;
    role: string;
  };
}
