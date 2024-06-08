import { eq } from 'drizzle-orm'
import { z } from 'zod'

import {db} from '~/server/db'
import { communities, subscriptions } from '~/server/db/schema'
import { CommunityValidator } from '~/lib/validators/community'
import { getCurrentUser } from '~/services/user'

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return new Response('Unauthorize', { status: 401 })
    }

    const body = await req.json() as unknown;

    const { name } = CommunityValidator.parse(body)

    const communityExists = await db.query.communities.findFirst({
      where: eq(communities.name, name)
    })

    if (communityExists) {
      return new Response('Community Already exists', { status: 409 })
    }

    const [newCommunity] = await db
      .insert(communities)
      .values({ name, creatorId: currentUser.id })
      .returning()

    await db
      .insert(subscriptions)
      .values({ userId: currentUser.id, communityId: newCommunity!.id })

    return new Response(newCommunity?.name)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not create community', { status: 500 })
  }
}