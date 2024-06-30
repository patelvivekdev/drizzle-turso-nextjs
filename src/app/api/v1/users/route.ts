import { getUsersWithPostsCount } from "@/db/queries";
import { unstable_noStore } from "next/cache";

export async function GET(request: Request) {
    unstable_noStore()
    let data = await getUsersWithPostsCount()
    return new Response(JSON.stringify(data))
}