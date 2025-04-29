// src/user/dto/register-user.dto.ts

import { IsString } from "class-validator";

export class RegisterUserDto {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
}
