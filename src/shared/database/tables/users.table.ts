import { mysqlEnum, mysqlTable, timestamp, tinyint, varchar } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const userTable = mysqlTable('users', {
  id: varchar('id', { length: 26 }).primaryKey().notNull(),
  googleId: varchar('google_id', { length: 50 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }),
  status: tinyint('status').default(1).notNull(),
  role: mysqlEnum('role', ['admin', 'user'])
  .default('user')  
  .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdateFn(() => new Date()),
  deletedAt: timestamp('deleted_at').default(sql`null`),
});
