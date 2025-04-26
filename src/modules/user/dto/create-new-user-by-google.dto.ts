import { USER_ROLES } from "src/shared/constants/enum/user.enum"

export class CreateNewUserByGoogle{
  id: string
  role: USER_ROLES
  email: string
  name: string
  googleId: string
}