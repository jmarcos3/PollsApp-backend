import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { CreateUserDto } from "../dto/create-user-by-plataform.dto";
import { USER_ERRORS } from "src/shared/constants/helpers/userErros.helpers";
import { USER_SUCESSFULL } from "src/shared/constants/helpers/userSuccessful.helpers";



@Injectable()
export class RegisterOnPlataformUseCase{ 
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(userInformation: any){
    // const newUserInformation = userInformation
    try{
      const userFound = await this.userRepository.getUserByEmail(userInformation.email)

      if (userFound.length > 0 ){ return  {message:USER_ERRORS.alreadyCreated} }
  
      const userCreated = await this.userRepository.createNewUserByPlataform(userInformation)
  
      if (userCreated){return {message:USER_SUCESSFULL.sucessfullCreated}}
    }
    catch(e){
      console.log(e)
    }

  }

}


