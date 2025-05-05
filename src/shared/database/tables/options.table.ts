import { mysqlTable, varchar, timestamp, foreignKey } from 'drizzle-orm/mysql-core';
import { pollsTable } from './polls.table';

export const optionTable = mysqlTable('options', {
  id: varchar('id', { length: 26 }).primaryKey().notNull(),
  text: varchar('text', { length: 255 }).notNull(),
  pollId: varchar('pollId', { length: 26 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdateFn(() => new Date()),
} , (table) => ({
  pollFk: foreignKey({
    columns: [table.pollId],
    foreignColumns: [pollsTable.id],
  })})
);