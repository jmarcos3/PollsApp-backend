import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Query, UseGuards } from '@nestjs/common';
import { CreatePollUseCase } from './useCases/createPoll.useCase';
import { PollResponseDto } from './dto/poll-response.dto';
import { PollDto } from './dto/create-poll.dto';
import { VoteOnPollUseCase } from './useCases/voteOnPoll.useCase';
import { GetAllPollsUseCase } from './useCases/getAllPolls.useCase';
import { GoogleOrLocalJwtGuard } from '../auth/auth.guard';


@Controller('poll')
export class PollController {
  constructor(private readonly createPoll: CreatePollUseCase,
    private readonly voteOnPoll: VoteOnPollUseCase,
    private readonly getAllPolls: GetAllPollsUseCase
  ) {}

  @Get()
  async getPolls(
    @Query('page') page,
    @Query('limit') limit,
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return this.getAllPolls.execute(pageNumber, limitNumber);
  }

  @UseGuards(GoogleOrLocalJwtGuard)
  @Post()
  async createNewPoll(@Headers('authorization') authorization: string,
  @Body() pollDto: PollDto
  ): Promise<{ pollId: string }> {
    return this.createPoll.execute(authorization, pollDto);
  }


  @UseGuards(GoogleOrLocalJwtGuard)
  @Post('vote')
  async votePoll(
    @Headers('authorization') authorization: string,
    @Body() body: { optionId: string },
  ): Promise<{ message: string }> {
    await this.voteOnPoll.execute(authorization, body.optionId);
    return { message: 'Voto registrado com sucesso!' };
  }
}
