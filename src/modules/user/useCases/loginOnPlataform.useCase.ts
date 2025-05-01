import { Injectable } from "@nestjs/common"
import { UserRepository } from "../repositories/user.repository"
import { USER_SUCESSFULL } from "src/shared/constants/helpers/userSuccessful.helpers"
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoginOnPlataformUseCase{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ){}
  
  async execute(userInformation: any) {

    const user = await this.userRepository.getUserByEmailAndPassword(userInformation);

    const payload = { sub: user.id, email: user.email, role: user.role };

    const token = this.jwtService.sign(payload);

    return {token};
  }
}