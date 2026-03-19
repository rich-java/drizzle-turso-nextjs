import { db } from './'
import { asc, count, eq, getTableColumns, sql } from 'drizzle-orm'
import { SelectUser, postsTable, InsertUser, usersTable, codeTable, productTable, SelectProduct } from './schema'
import { Consts } from '@/app/consts/consts'

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data)
}

export async function getAllUsers() {
  return db.select().from(usersTable)
}

export async function getUsers(
  search: string | undefined,
  page: number = 1,
  pageSize: number = 10,
): Promise<{
  users: SelectUser[]
  totalUsersCount: number
  hasNextPage: boolean
}> {
  const offset = (page - 1) * pageSize

  let query = db.select().from(usersTable).$dynamic()
  if (search) {
    query = query.where(sql`lower(${usersTable.name}) like lower(${'%' + search + '%'})`)
  }

  let countQuery = db.select({ totalUsersCount: count() }).from(usersTable).$dynamic()

  if (search) {
    countQuery = countQuery.where(sql`lower(${usersTable.name}) LIKE ${sql.raw(`'%${search.toLowerCase()}%'`)}`)
  }

  const [users, [{ totalUsersCount }]] = await Promise.all([query.limit(pageSize).offset(offset), countQuery])

  return {
    users,
    totalUsersCount: Number(totalUsersCount),
    hasNextPage: users.length === pageSize,
  }
}

export async function getUserById(id: SelectUser['id']): Promise<
  Array<{
    id: number
    name: string
    age: number
    email: string
  }>
> {
  return db.select().from(usersTable).where(eq(usersTable.id, id))
}

export async function getUsersWithPostsCount(
  page = 1,
  pageSize = 5,
): Promise<
  Array<{
    postsCount: number
    id: number
    name: string
    age: number
    email: string
  }>
> {
  return db
    .select({
      ...getTableColumns(usersTable),
      postsCount: count(postsTable.id),
    })
    .from(usersTable)
    .leftJoin(postsTable, eq(usersTable.id, postsTable.userId))
    .groupBy(usersTable.id)
    .orderBy(asc(usersTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize)
}

export async function getCodes(): Promise<
  Array<{
    cdId: number
    grpCd: string
    cd: string
    nm: string
    delFlg: number
    createdAt: string
    updatedAt: string
  }>
> {
  return db.select().from(codeTable);
}

export async function getProducts2(): Promise<
  Array<{
    prdId: number
    charaNm: string
    nm: string
    charaCd: string
    catCd: string
    images: string
    urls: string
    delFlg: number
    createdAt: string
    updatedAt: string
  }>
> {
  return db.select().from(productTable);
}

export async function getProducts(
  search: string | undefined,
  page: number = 1,
  pageSize: number = Consts.DEFAULT_PAGE_SIZE,
): Promise<{
  products: SelectProduct[]
  totalRowsCount: number
  hasNextPage: boolean
}> {
  const offset = (page - 1) * pageSize;

  let query = db.select().from(productTable).$dynamic();
  if (search) {
    query = query.where(sql`lower(${productTable.nm}) like lower(${'%' + search + '%'})`);
  }

  let countQuery = db.select({ totalProductsCount: count() }).from(productTable).$dynamic();

  if (search) {
    countQuery = countQuery.where(sql`lower(${productTable.nm}) LIKE ${sql.raw(`'%${search.toLowerCase()}%'`)}`);
  }

  const [products, [{ totalProductsCount }]] = await Promise.all([query.limit(pageSize).offset(offset), countQuery]);

  return {
    products,
    totalRowsCount: Number(totalProductsCount),
    hasNextPage: products.length === pageSize,
  };
}
