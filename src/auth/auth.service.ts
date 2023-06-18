import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import {
  Injectable,
  Logger,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: AuthCredentialDto) {
    try {
      this.logger.log('Sign up', JSON.stringify(signUpDto));

      const salt = await bcrypt.genSalt();
      signUpDto.password = await bcrypt.hash(signUpDto.password, salt);
      const newUser = new this.userModel(signUpDto);
      await newUser.save();
      return;
    } catch (e) {
      this.logger.error('Sign up error', e.message);
      throw new HttpException(e.message, e.status);
    }
  }

  async signIn(signInDto: AuthCredentialDto) {
    this.logger.log(`Signing in ${signInDto.username}`);

    const user = await this.userModel.findOne({
      username: signInDto.username,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid username / password');
    }
    const isMatch = await bcrypt.compare(signInDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid username / password');
    }

    const payload = { username: user.username, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async validateUser(payload: any) {
    const { username, sub } = payload;
    return this.userModel
      .findOne({ _id: sub, username })
      .select('-password')
      .exec();
  }
}
