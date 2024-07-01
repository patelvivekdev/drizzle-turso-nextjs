import { db } from "./";
import { asc, count, eq, getTableColumns, sql } from "drizzle-orm";
import { SelectUser, postsTable, InsertUser, usersTable } from "./schema";

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

export async function getAllUsers() {
  return db.select().from(usersTable);
}

export async function getUsers(
  search: string | undefined,
  page: number = 1,
  pageSize: number = 10
): Promise<{
  users: SelectUser[];
  totalUsersCount: number;
  hasNextPage: boolean;
}> {
  const offset = (page - 1) * pageSize;

  let query = db.select().from(usersTable).$dynamic();
  if (search) {
    query = query.where(
      sql`lower(${usersTable.name}) like lower(${"%" + search + "%"})`
    );
  }

  let countQuery = db
    .select({ totalUsersCount: count() })
    .from(usersTable)
    .$dynamic();

  if (search) {
    countQuery = countQuery.where(
      sql`lower(${usersTable.name}) LIKE ${sql.raw(
        `'%${search.toLowerCase()}%'`
      )}`
    );
  }

  const [users, [{ totalUsersCount }]] = await Promise.all([
    query.limit(pageSize).offset(offset),
    countQuery,
  ]);

  return {
    users,
    totalUsersCount: Number(totalUsersCount),
    hasNextPage: users.length === pageSize,
  };
}

export async function getUserById(id: SelectUser["id"]): Promise<
  Array<{
    id: number;
    name: string;
    age: number;
    email: string;
  }>
> {
  return db.select().from(usersTable).where(eq(usersTable.id, id));
}

export async function getUsersWithPostsCount(
  page = 1,
  pageSize = 5
): Promise<
  Array<{
    postsCount: number;
    id: number;
    name: string;
    age: number;
    email: string;
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
    .offset((page - 1) * pageSize);
}
