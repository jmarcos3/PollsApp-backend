import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { LoginWithGoogleUseCase } from './useCases/loginWithGoogle.useCase';
import { CreateUserDto } from './dto/create-user-by-plataform.dto';
import { RegisterOnPlataformUseCase } from './useCases/registerOnPlataform.useCase';
import { RegisterUserDto } from './dto/front-end-info.dto';
import { UserLoginDto } from './dto/user-login-dto.dto';
import { LoginOnPlataformUseCase } from './useCases/loginOnPlataform.useCase';
import { userInfo } from 'os';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUsersUseCase } from './useCases/getUsers.useCase';
import { GoogleOrLocalJwtGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly loginWithGoogleUseCase: LoginWithGoogleUseCase,
    private readonly registerOnPlataform: RegisterOnPlataformUseCase,
    private readonly loginOnPlataform: LoginOnPlataformUseCase,
    private readonly findUsers: GetUsersUseCase,
  ) {}

  @Post('loginGoogle')
  loginWithGoogle(@Headers('Authorization') authorization: string) {
    return this.loginWithGoogleUseCase.execute(authorization);
  }

  @Post()
  registeOnPlataform(@Body() userInformation: RegisterUserDto) {
    return this.registerOnPlataform.execute(userInformation);
  }

  @Post('loginOnPlataform')
  plataformLogin(@Body() userInformation: UserLoginDto) {
    return this.loginOnPlataform.execute(userInformation);
  }

  @UseGuards(GoogleOrLocalJwtGuard)
  @Get()
  getAll() {
    // console.log(auth)
    return this.findUsers.execute();
  }
}
