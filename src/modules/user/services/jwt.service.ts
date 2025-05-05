import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jwt-decode';
import { USER_ERRORS } from 'src/shared/constants/helpers/userErros.helpers';

@Injectable()
export class JwtServiceDecode {
  extractUserInformationFromGoogleToken(authorization: string) {
    const token = authorization.split(' ')[1];
    let extractedUserInformationFromGoogleToken

    try{extractedUserInformationFromGoogleToken = jwt.jwtDecode(token);}

    catch(e){throw new UnauthorizedException(USER_ERRORS.tokenInvalid)}
    
    if (
      !extractedUserInformationFromGoogleToken.email ||
      !extractedUserInformationFromGoogleToken.sub
    ) {
      throw new UnauthorizedException(USER_ERRORS.tokenInvalid);
    }
    return extractedUserInformationFromGoogleToken;
  }
}
