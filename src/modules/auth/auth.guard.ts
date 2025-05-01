import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class GoogleOrLocalJwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly strategy: JwtStrategy,
  ) {}

   canActivate(context: ExecutionContext) { 
    return this.validate(context);
  }

  async validate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return false;
    }

    return this.strategy.validate(context)
  }
}