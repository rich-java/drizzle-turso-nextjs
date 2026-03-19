import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').unique().notNull(),
})

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export const postsTable = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
})

export type InsertPost = typeof postsTable.$inferInsert
export type SelectPost = typeof postsTable.$inferSelect

export const codeTable = sqliteTable("m_code", {
  cdId: integer("cd_id").primaryKey(),
  grpCd: text("grp_cd").notNull(),
  cd: text("cd").notNull(),
  nm: text("nm").notNull(),
  delFlg: integer("del_flg").notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export type InsertCode = typeof codeTable.$inferInsert;
export type SelectCode = typeof codeTable.$inferSelect;

export const productTable = sqliteTable("t_product", {
  prdId: integer("prd_id").primaryKey(),
  charaNm: text("chara_nm").notNull(),
  nm: text("nm").notNull(),
  charaCd: text("chara_cd").notNull(),
  catCd: text("cat_cd").notNull(),
  images: text("images").notNull(),
  urls: text("urls").notNull(),
  delFlg: integer("del_flg").notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export type InsertProduct = typeof productTable.$inferInsert;
export type SelectProduct = typeof productTable.$inferSelect;
