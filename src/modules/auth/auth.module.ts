import { Module, forwardRef } from '@nestjs/common';
import { PassportModule }      from '@nestjs/passport';
import { JwtModule }           from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtStrategy }         from './jwt.strategy';
import { JwtAuthGuard }        from './jwt-auth.guard';
import { UserModule }          from '../user/user.module';
import { JwtServiceDecode } from '../user/services/jwt.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') || 'mySuperSecretKey',
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => UserModule),
  ],
  providers: [JwtStrategy, JwtAuthGuard, JwtServiceDecode],
  exports: [PassportModule, JwtModule, JwtAuthGuard],
})
export class AuthModule {}