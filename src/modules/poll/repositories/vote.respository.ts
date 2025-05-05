import { Injectable } from '@nestjs/common';
import { Database } from "src/shared/database";
import { user_optionsTable } from '../../../shared/database/tables/users_options.table';
import { and, eq } from 'drizzle-orm';
import { ulid } from 'ulid';

@Injectable()
export class VoteRepository {
  private database;
  constructor(){
    this.database = Database.getInstance().getDrizzle()
  }
  async hasUserVoted(userId: string, pollId: string): Promise<boolean> {
   
    const result = await this.database
    .select()
    .from(user_optionsTable)
    .where(
      and(
      eq(user_optionsTable.userId, userId),
      eq(user_optionsTable.pollId, pollId)
      ),
    );
  
    return result.length > 0;
  }

  async registerVote(userId: string, optionId: string, pollId: string): Promise<void> {
    await this.database.insert(user_optionsTable).values({
      id: ulid(),
      userId,
      optionId,
      pollId,
    });
  }
}
