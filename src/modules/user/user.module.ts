// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';;
import { UserController } from './user.controller';
import { LoginWithGoogleUseCase } from './useCases/loginWithGoogle.useCase';
import { JwtService } from './services/jwt.service';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'chave_secreta_de_tests',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [LoginWithGoogleUseCase, JwtService, UserRepository],
  exports: [LoginWithGoogleUseCase],
})
export class UserModule {}
