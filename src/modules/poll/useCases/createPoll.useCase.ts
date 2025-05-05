import { UserRepository } from "src/modules/user/repositories/user.repository";
import { JwtServiceDecode } from "src/modules/user/services/jwt.service";
import { PollRepository } from "../repositories/poll.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PollDto } from "../dto/create-poll.dto";
import { OptionRepository } from "../repositories/option.repository";
import { ulid } from "ulid";

@Injectable()
export class CreatePollUseCase {
  constructor(
    private readonly jwtService: JwtServiceDecode,
    private readonly userRepo: UserRepository,
    private readonly pollRepo: PollRepository,
    private readonly optionRepo: OptionRepository,
  ) {}

  async execute(authorization: string, pollDto: PollDto) {
    // 1) valida usuário
    const { email, sub: googleId } = this.jwtService.extractUserInformationFromGoogleToken(authorization);
    const [user] = await this.userRepo.getUserByEmail(email);

    if (!user) throw new NotFoundException('Usuário não encontrado');

    const pollId = ulid();
    // 3) cria poll + vincula opções
    const pollCreated = await this.pollRepo.createNewPoll(user.id, pollDto, pollId);
    
    // 2) cria ou recupera opções -> pega só os IDs
    const optionIds = await this.optionRepo.createAndReturnIds(pollDto.options, pollId);

    
    console.log(pollCreated)
    
    return { pollId };
  }
}