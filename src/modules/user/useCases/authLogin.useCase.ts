// src/user/useCases/authLogin.useCase.ts
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
    // 1) Strip do Bearer
    const token = authorization.replace(/^Bearer\s+/i, '');
    let payload: any;
    try {
      // 2) Verifica assinatura e expiração
      payload = this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    // 3) (Opcional mas recomendado) Busca o usuário no banco
    const user = await this.userRepo.getUserByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    // 4) Retorna quem é o usuário (e, se quiser, o payload)
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
