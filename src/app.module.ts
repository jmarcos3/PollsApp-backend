import { Module }       from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PollModule } from './modules/poll/poll.module';
import { AuthModule }   from './modules/auth/auth.module';
import { UserModule }   from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PollModule,
  ],
})
export class AppModule {}
