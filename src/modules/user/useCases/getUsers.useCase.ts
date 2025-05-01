import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class GetUsersUseCase {
  constructor(private readonly userReposity: UserRepository) {}

  async execute() {
    return this.userReposity.getUsers();
  }
}
