import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class AuthLoginUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepository,
  ) {}

  async execute(authorization: string) {

    const token = authorization.replace(/^Bearer\s+/i, '');
    let payload: any;
    try {
      payload = this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    const user = await this.userRepo.getUserByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      payload,
    };
  }
}
