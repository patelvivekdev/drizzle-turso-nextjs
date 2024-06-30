import { getUsersWithPostsCount } from "@/db/queries";

export async function GET(request: Request) {
    let data = await getUsersWithPostsCount()
    return new Response(JSON.stringify(data))
}