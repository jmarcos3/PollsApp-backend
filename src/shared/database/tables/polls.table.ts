import { mysqlTable, varchar, timestamp, foreignKey } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';
import { userTable } from './users.table'; 

export const pollsTable = mysqlTable('polls', {
  id: varchar('id', { length: 26 }).primaryKey().notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 1000 }),
  user: varchar('user', { length: 26 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdateFn(() => new Date()),
  deletedAt: timestamp('deleted_at').default(sql`null`),
}, (table) => ({
  userFk: foreignKey({
    columns: [table.user],
    foreignColumns: [userTable.id],
  }).onDelete('cascade'), 
}));
