import { getUserById } from "@/db/queries"
import { unstable_noStore } from "next/cache"

type Params = {
    id: string
}

export async function GET(request: Request, context: { params: Params }) {
    unstable_noStore()
    const team = context.params.id

    let data = await getUserById(parseInt(team))
    return new Response(JSON.stringify(data))
}
