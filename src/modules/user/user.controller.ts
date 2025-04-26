import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { UserService as oginWithGoogleUseCase } from './user.service';
import { log } from 'console';
import { LoginWithGoogleUseCase } from './useCases/loginWithGoogle.useCase';

@Controller('user')
export class UserController {
  constructor(private readonly loginWithGoogleUseCase: LoginWithGoogleUseCase) {}

  @Post(
    'loginGoogle',
  )

  loginWithGoogle(@Headers('Authorization') authorization:string) {
    
    // console.log('token original:', token);

    return this.loginWithGoogleUseCase.execute(authorization);
  }

//   @Get()
//   findAll() {
//     return this.loginWithGoogleUseCase.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.loginWithGoogleUseCase.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//     return this.loginWithGoogleUseCase.update(+id, updateUserDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.loginWithGoogleUseCase.remove(+id);
//   }
}
