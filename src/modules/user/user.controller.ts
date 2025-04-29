import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { LoginWithGoogleUseCase } from './useCases/loginWithGoogle.useCase';
import { CreateUserDto } from './dto/create-user-by-plataform.dto';
import { RegisterOnPlataformUseCase } from './useCases/registerOnPlataform.useCase';
import { RegisterUserDto } from './dto/front-end-info.dto';
import { UserLoginDto } from './dto/user-login-dto.dto';


@Controller('user')
export class UserController {
  constructor(
    private readonly loginWithGoogleUseCase: LoginWithGoogleUseCase,
    private readonly registerOnPlataform: RegisterOnPlataformUseCase,
  ) {}

  @Post('loginGoogle')

  loginWithGoogle(@Headers('Authorization') authorization:string) {
    
    // console.log('token original:', token);

    return this.loginWithGoogleUseCase.execute(authorization);
  }

  @Post()

  registeOnPlataform(@Body() userInformation: RegisterUserDto){
    
    return this.registerOnPlataform.execute(userInformation)
  }

  @Get()

  plataformLogin(@Body() userInformation: UserLoginDto){
    return this.loginOnPlataform.execute(userInformation)
  }

}
