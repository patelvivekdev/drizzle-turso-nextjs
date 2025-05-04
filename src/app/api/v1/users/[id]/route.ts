import { getUserById } from '@/db/queries'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const team = (await params).id

  let data = await getUserById(parseInt(team))
  return new Response(JSON.stringify(data))
}
