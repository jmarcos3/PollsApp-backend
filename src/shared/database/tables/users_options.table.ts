import { mysqlTable,varchar,timestamp,primaryKey, uniqueIndex,} from 'drizzle-orm/mysql-core';
import { userTable } from '../tables/users.table';
import { optionTable } from '../tables/options.table';
import { pollsTable } from './polls.table';

export const user_optionsTable = mysqlTable(
  'votes',
  {
    id: varchar('id', { length: 26 }).notNull(),
    userId: varchar('user_id', { length: 26 })
      .notNull()
      .references(() => userTable.id),
    optionId: varchar('option_id', { length: 26 })
      .notNull()
      .references(() => optionTable.id),
    pollId: varchar('poll_id', { length: 26 })
    .notNull()
    .references(() => pollsTable.id),
    votedAt: timestamp('voted_at').defaultNow().notNull(),
  },
  (table) => ([
    uniqueIndex('uq_vote_user_poll_option').on(table.userId,table.optionId,table.pollId)
  ])
);
