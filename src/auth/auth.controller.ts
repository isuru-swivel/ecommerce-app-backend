import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto) {
    try {
      return this.authService.signUp(signUpDto);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Post('/login')
  signIn(@Body() signInDto: AuthCredentialDto) {
    try {
      return this.authService.signIn(signInDto);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
