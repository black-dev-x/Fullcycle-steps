import { Body, Controller } from '@nestjs/common';
import { LoginDto } from './login.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
