import { Injectable } from '@nestjs/common';
import { PollRepository } from '../repositories/poll.repository';

@Injectable()
export class GetAllPollsUseCase {
  constructor(private readonly pollRepository: PollRepository) {}

  async execute(page: number, limit: number) {
    return this.pollRepository.getAllPollsWithOptions(page, limit);
  }
}