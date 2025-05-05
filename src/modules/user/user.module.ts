import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { LoginWithGoogleUseCase } from './useCases/loginWithGoogle.useCase';
import { RegisterOnPlataformUseCase } from './useCases/registerOnPlataform.useCase';
import { LoginOnPlataformUseCase } from './useCases/loginOnPlataform.useCase';
import { AuthLoginUseCase } from './useCases/authLogin.useCase';
import { UserRepository } from './repositories/user.repository';
import { JwtServiceDecode } from './services/jwt.service';
import { GetUsersUseCase } from './useCases/getUsers.useCase';
import { GoogleOrLocalJwtGuard } from '../auth/auth.guard';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PollController } from '../poll/poll.controller';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [
    JwtServiceDecode,
    GetUsersUseCase,
    LoginWithGoogleUseCase,
    RegisterOnPlataformUseCase,
    LoginOnPlataformUseCase,
    AuthLoginUseCase,
    UserRepository,
    GoogleOrLocalJwtGuard,
    JwtStrategy,
  ],
  exports: [
    UserRepository,
    RegisterOnPlataformUseCase,
    LoginOnPlataformUseCase,
  ],
})
export class UserModule {}
