import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtServiceDecode } from 'src/modules/user/services/jwt.service';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { OptionRepository } from '../repositories/option.repository';
import { VoteRepository } from '../repositories/vote.respository';

@Injectable()
export class VoteOnPollUseCase {
  constructor(
    private readonly jwtService: JwtServiceDecode,
    private readonly userRepo: UserRepository,
    private readonly optionRepo: OptionRepository,
    private readonly voteRepo: VoteRepository,
  ) {}

  async execute(authorization: string, optionId: string): Promise<void> {
    const { email } = this.jwtService.extractUserInformationFromGoogleToken(authorization);
    
    const [user] = await this.userRepo.getUserByEmail(email);
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const pollExists = await this.optionRepo.getPollId(optionId);
    if (!pollExists) throw new NotFoundException('Opção não encontrada');

    const alreadyVoted = await this.voteRepo.hasUserVoted(user.id, pollExists);
    if (alreadyVoted) throw new ConflictException('Usuário já votou nessa opção');

    await this.voteRepo.registerVote(user.id, optionId, pollExists);
  }
}
