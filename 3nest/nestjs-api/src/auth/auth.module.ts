import { Module, OnModuleInit } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRoles } from './roles'

@Module({
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule implements OnModuleInit {

  constructor(private authService: AuthService) {}

  async onModuleInit() {
    const user = { 
      email: 'customer@user.com',
      password: ''
    }
    const savedUser = this.authService.findByEmail(user.email)
    if(!savedUser) {
      this.authService.createUser(user)
    }
  }
}
