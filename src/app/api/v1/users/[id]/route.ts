import { getUserById } from "@/db/queries"

type Params = {
    id: string
}

export async function GET(request: Request, context: { params: Params }) {
    const team = context.params.id

    let data = await getUserById(parseInt(team))
    return new Response(JSON.stringify(data))
}
