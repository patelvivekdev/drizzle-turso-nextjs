import Pagination from "@/components/pagination";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getUsers } from "@/db/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
  description: "Manage users",
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { q: string; page: string; pageSize: string };
}) {
  const search = searchParams.q ?? "";
  const page = searchParams.page ?? 0;
  const pageSize = searchParams.pageSize ?? 5;

  const { users, hasNextPage, totalUsersCount } = await getUsers(search, Number(page), Number(pageSize));

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Users</h1>
      </div>
      <DataTable columns={columns} data={users} />
      <Pagination hasNextPage={hasNextPage} pageSize={pageSize} currentPage={page} totalUsersCount={totalUsersCount} />
    </main>
  );
}
