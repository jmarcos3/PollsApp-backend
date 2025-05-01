// src/auth/jwt.strategy.ts
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../user/repositories/user.repository';
import { Observable } from 'rxjs';
import { JwtServiceDecode } from '../user/services/jwt.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtServiceDecode
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET') || 'mySuperSecretKey',
    });
    console.log('✅ JwtStrategy registrada');
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['authorization'];
    if (!token) return false;

    return this.validate(token);
  }

  async validate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['authorization'];
    
    let userContent
    try{
      userContent = this.jwtService.extractUserInformationFromGoogleToken(token)
    }
    catch(e){
      return false;
    }
    
    const user = await this.userRepo.getUserByEmail(userContent.email);
    if (!user) {
      return false;
    }
    // Passport automaticamente injeta o retorno de validate em `req.user`
    return true;
  }
}
