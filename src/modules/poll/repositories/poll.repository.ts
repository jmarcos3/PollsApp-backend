// src/modules/poll/repositories/poll.repository.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { ulid } from "ulid";
import { pollsTable } from "../../../shared/database/tables/polls.table";
import { Database } from "src/shared/database";
import { PollDto } from "../dto/create-poll.dto";
import { PollResponseDto } from "../dto/poll-response.dto";
import { eq, inArray } from "drizzle-orm";
import { optionTable } from "src/shared/database/tables/options.table";
import { userTable } from "src/shared/database/tables";

@Injectable()
export class PollRepository {
  private database;

  constructor() {
    this.database = Database.getInstance().getDrizzle();
  }

  async createNewPoll(userId: string, dto: PollDto, pollId): Promise<{message:string}> {
    

    await this.database.transaction(async tx => {

      await tx.insert(pollsTable).values({
        id: pollId,
        title: dto.title,
        description: dto.description,
        user: userId,
      });
    });

    return {message: "Voce criou a poll com sucesso "};
  }

  async getAllPollsWithOptions(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
  
    const paginatedPolls = await this.database
      .select({
        pollId: pollsTable.id,
        title: pollsTable.title,
        description: pollsTable.description,
        createdAt: pollsTable.createdAt,
      })
      .from(pollsTable)
      .limit(limit)
      .offset(offset);
  
    const pollIds = paginatedPolls.map((p) => p.pollId);
  
    if (pollIds.length === 0) return [];
  
  
    const options = await this.database
      .select({
        pollId: optionTable.pollId,
        optionId: optionTable.id,
        optionText: optionTable.text,
      })
      .from(optionTable)
      .where(inArray(optionTable.pollId, pollIds))
      

    const result = paginatedPolls.map(poll => ({
      id: poll.pollId,
      title: poll.title,
      description: poll.description,
      createdAt: poll.createdAt,
      options: options
        .filter(opt => opt.pollId === poll.pollId)
        .map(opt => ({
          id: opt.optionId,
          text: opt.optionText,
        })),
    }));
  
    return result;
  }
}