import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Post('/login')
  async signIn(@Body() signInDto: AuthCredentialDto) {
    return await this.authService.signIn(signInDto);
  }
}
