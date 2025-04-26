import { USER_SUCESSFULL } from "src/shared/constants/helpers/userSuccessful.helpers";
import { UserRepository } from "../repositories/user.repository";
import { JwtService } from "../services/jwt.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LoginWithGoogleUseCase{
  constructor (
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,

  ){
  }

  async execute (authorization:string) {
    const userGoogleInformation = this.jwtService.extractUserInformationFromGoogleToken(authorization)

    const userFound = await this.userRepository.getUserByEmail(userGoogleInformation.email)

   

    if (userFound.length > 0){
      const userUpdated = await this.userRepository.updateUserByGoogleId(userGoogleInformation)

      if (userUpdated) return {message: USER_SUCESSFULL.sucessfullUpdated}
    }

    const userCreated = await this.userRepository.createNewUserByGoogle(userGoogleInformation)
    
    if (userCreated) return {message: USER_SUCESSFULL.sucessfullCreated}
  

  }
} 