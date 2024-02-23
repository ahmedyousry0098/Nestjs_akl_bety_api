import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDTO, RegisterDTO } from './dto/user.dto';
import { Response } from 'express';

@Controller('')
export class UserController {
  constructor(private readonly _UserService: UserService) {}

  @Post('register')
  async register(
    @Res() response: Response,
    @Body() userInfo: RegisterDTO,
  ) {
    return this._UserService.register(response, userInfo)
  };

  @Post('login')
  async login(
    @Res() response: Response,
    @Body() userInfo: LoginDTO
  ) {
    return this._UserService.login(response, userInfo);
  };
}
