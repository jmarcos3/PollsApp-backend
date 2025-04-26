
import * as mysql2 from 'mysql2';// ajuste se necessário
import { drizzle } from 'drizzle-orm/mysql2';
import { ConfigService } from '@nestjs/config';
import * as schema from './tables';
import { userTable } from './tables';

const configService = new ConfigService();


export class Database {
  private static instance: Database;
  private connection: mysql2.Connection;
  private db: ReturnType<typeof drizzle>;

  private constructor() {
    this.connection = mysql2.createConnection({
      host: configService.get('DB_HOST'),
      user: configService.get('DB_USER'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      port: Number(configService.get('DB_PORT')),
    });

    this.db = drizzle(this.connection, { schema, mode: 'default' });

  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          console.error('Erro ao conectar ao banco:', err);
          reject(err);
        } else {
          console.log('Conectado ao MySQL com sucesso!');
          resolve();
        }
      });
    });
  }

  public getDrizzle() {
    return this.db;
  }

  public getConnection() {
    return this.connection;
  }
}
