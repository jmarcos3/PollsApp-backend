import { eq } from "drizzle-orm";
import { Database } from "src/shared/database";
import { userTable } from 'src/shared/database/tables/users.table';
import { UpdateUserByLoginGoogleDto } from "../dto/update-user-by-login-google.dto";
import { CreateNewUserByGoogle } from "../dto/create-new-user-by-google.dto";
import { ulid } from "ulid";
import { USER_ROLES } from "src/shared/constants/enum/user.enum";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user-by-plataform.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository{
  private database;

  constructor(){
    const database = Database.getInstance();
    this.database = database.getDrizzle();
  }
  
  async getUserByEmail(email:string){

    const userFound = await this.database
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

    return userFound
  }

  async updateUserByGoogleId(userGoogleInformation: any){

    const bodyToUpdate: UpdateUserByLoginGoogleDto = {
      email: userGoogleInformation.email,
      name: userGoogleInformation.name,
    }

    const userUpdate = await this.database
    .update(userTable)
    .set(bodyToUpdate)
    .where(eq(userTable.googleId, userGoogleInformation.sub));

    return userUpdate
  }

  async createNewUserByGoogle(userGoogleInformation:any){

    const bodyToCreate: CreateNewUserByGoogle ={
      id: ulid(),
      role: USER_ROLES.USER,
      email: userGoogleInformation.email,
      name: userGoogleInformation.name,
      googleId: userGoogleInformation.sub
    } 
    const userCreated = await this.database
    .insert(userTable)
    .values(bodyToCreate);

    return userCreated
  }


  async createNewUserByPlataform(userInformation) {
    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(userInformation.password, 10); // 10 é o "salt rounds"
  
    const bodyToCreate: CreateUserDto = {
      id: ulid(),
      role: USER_ROLES.USER,
      email: userInformation.email,
      name: userInformation.name,
      password: hashedPassword, // agora a senha está criptografada
      googleId: 'noGoogleId',
    };
  
    const userCreated = await this.database
      .insert(userTable)
      .values(bodyToCreate);
  
    return userCreated;
  }
}