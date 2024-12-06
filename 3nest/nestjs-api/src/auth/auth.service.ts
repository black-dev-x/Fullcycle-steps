import { Injectable } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from './create-user.dto'
import { UserRoles } from './roles'
import { AuthorizationError, ErrorCreatingAccount } from './auth.errors'
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  
  constructor(private prismaService: PrismaService) {}

  async login(data: LoginDto) {
    const user = await this.prismaService.user.findFirst({ where: { email: data.email } })
    if(!user || !bcrypt.compareSync(data.password, user.password)) {
      throw new AuthorizationError();
    }
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findFirst({ where: { email } })
  }

  async createUser(user: CreateUserDto, role: UserRoles = UserRoles.Customer) {
    const savedUser = await this.findByEmail(user.email)
    if(savedUser) {
      throw new ErrorCreatingAccount();
    }
    return this.prismaService.user.create(
      { data: 
        {...user,
          password: await bcrypt.hashSync(user.password, 10), 
          role
        } 
      }
    )
  }
}
