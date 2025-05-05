import { forwardRef, Module } from '@nestjs/common';

import { PollController } from './poll.controller';
import { PollRepository } from './repositories/poll.repository';
import { CreatePollUseCase } from './useCases/createPoll.useCase';
// import { getPollUseCase } from './useCases/getPollUseCase.useCase';
import { OptionRepository } from './repositories/option.repository';
import { UserModule } from '../user/user.module';
import { JwtServiceDecode } from '../user/services/jwt.service';
import { VoteOnPollUseCase } from './useCases/voteOnPoll.useCase';
import { VoteRepository } from './repositories/vote.respository';
import { GetAllPollsUseCase } from './useCases/getAllPolls.useCase';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthLoginUseCase } from '../user/useCases/authLogin.useCase';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    UserModule,],
  controllers: [PollController],
  providers: [
    PollRepository,
    CreatePollUseCase,
    GetAllPollsUseCase,
    OptionRepository,
    JwtServiceDecode,
    VoteOnPollUseCase,
    VoteRepository,
    JwtStrategy,
    AuthLoginUseCase,
  ],
  exports: [],
})
export class PollModule {}
