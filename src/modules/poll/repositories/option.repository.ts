// src/modules/poll/repositories/option.repository.ts

import { Injectable } from "@nestjs/common";
import { ulid } from "ulid";
import { eq } from "drizzle-orm";
import { optionTable } from "../../../shared/database/tables/options.table";
import { Database } from "src/shared/database";

@Injectable()
export class OptionRepository {
  private database;

  constructor() {
    const database = Database.getInstance()
    this.database = database.getDrizzle();
  }

  /** 
   * Para cada texto:
   *  - Se já existir, pega o id
   *  - Senão, insere e retorna o novo id
   */

  async createAndReturnIds(texts: string[], pollId: string): Promise<string[]> {
    const unique = Array.from(new Set(texts.map(t => t.trim())));
    const ids: string[] = [];
  
    for (const text of unique) {
      const id = ulid();
      await this.database.insert(optionTable).values({
        id,
        text,
        pollId,
      });
      ids.push(id);
    }
  
    return ids;
  }

  async getPollId(optionId: string): Promise<any> {
  
    const rows = await this.database
    .select({pollId: optionTable.pollId})
    .from(optionTable)
    .where(eq(optionTable.id, optionId))
    return rows[0].pollId
  }



}
