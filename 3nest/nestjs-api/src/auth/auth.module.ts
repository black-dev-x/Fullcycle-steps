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
      email: 'customer@customer.com',
      password: 'customer'
    }
    const savedUser = await this.authService.findByEmail(user.email)
    if(!savedUser) {
      await this.authService.createUser(user)
    }
    const admin = {
      email: 'admin@admin.com', 
      password: 'admin'
    }
    const savedAdmin = await this.authService.findByEmail(admin.email)
    if(!savedAdmin) {
      await this.authService.createUser(admin, UserRoles.Admin)
    }
  }
}
