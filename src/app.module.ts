import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [UserModule,
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente acessíveis em toda a aplicação
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
