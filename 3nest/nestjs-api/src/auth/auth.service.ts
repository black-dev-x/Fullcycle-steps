import { Injectable } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from './create-user.dto'
import { UserRoles } from './roles'
import { AuthorizationError, ErrorCreatingAccount } from './auth.errors'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

export type AuthServicePayload = {
  sub: string;
  role: string;
}
@Injectable()
export class AuthService {
  
  constructor(private prismaService: PrismaService, private jwtService: JwtService) {}

  async login(data: LoginDto) {
    const user = await this.prismaService.user.findFirst({ where: { email: data.email } })
    if(!user || !bcrypt.compareSync(data.password, user.password)) {
      throw new AuthorizationError();
    }
    const payload: AuthServicePayload = {
      sub: user.id,
      role: user.role
    }
    return { access_token: this.jwtService.sign(payload) }
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findFirst({ where: { email } })
  }

  async createUser(user: CreateUserDto, role: UserRoles = UserRoles.Customer) {
    const savedUser = await this.findByEmail(user.email)
    if(savedUser) {
      throw new ErrorCreatingAccount();
    }
    return await this.prismaService.user.create(
      { data: 
        {...user,
          password: await bcrypt.hashSync(user.password, 10), 
          role
        } 
      }
    )
  }
}
