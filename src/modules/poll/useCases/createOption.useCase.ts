import { UserRepository } from "src/modules/user/repositories/user.repository";
import { JwtServiceDecode } from "src/modules/user/services/jwt.service";
import { OptionRepository } from "../repositories/option.repository";


export class CreateOptionUseCase{
  constructor(
    private readonly jwtService: JwtServiceDecode,
    private readonly userRepository: UserRepository,
    private readonly optionRepository: OptionRepository
  ){}

  async execute(){
    
  }
} 