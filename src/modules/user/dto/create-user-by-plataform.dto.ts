import { USER_ROLES } from "src/shared/constants/enum/user.enum"

export class CreateUserDto{
  id: string
  role: USER_ROLES
  email: string
  password:string
  name: string
  googleId: string
}