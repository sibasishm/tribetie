import { desc, eq, inArray, type SQL } from 'drizzle-orm'
import { z } from 'zod'

import {db} from '~/server/db'
import { posts as Posts, communities, subscriptions } from '~/server/db/schema'
import { getCurrentUser } from '~/services/user'

export async function GET(req: Request) {
  const url = new URL(req.url)

  const currentUser = await getCurrentUser()

  let followedCommunitiesIds: number[] = []

  if (currentUser) {
    const followedCommunities = await db.query.subscriptions.findMany({
      where: eq(subscriptions.userId, currentUser.id),
      with: {
        community: true
      }
    })

    followedCommunitiesIds = followedCommunities.map(
      ({ community }) => community.id
    )
  }

  try {
    const { limit, page, communityName } = z
      .object({
        limit: z.string(),
        page: z.string(),
        communityName: z.string().nullish().optional()
      })
      .parse({
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
        communityName: url.searchParams.get('communityName')
      })

    let whereClause: SQL<unknown> | undefined = undefined

    if (communityName) {
      const existingCommcommunity = await db.query.communities.findFirst({
        where: eq(communities.name, communityName)
      })

      if (existingCommcommunity)
        whereClause = eq(Posts.communityId, existingCommcommunity.id)
    } else if (currentUser) {
      whereClause = inArray(Posts.communityId, followedCommunitiesIds)
    }

    const posts = await db.query.posts.findMany({
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      orderBy: [desc(Posts.createdAt)],
      with: {
        community: true,
        votes: true,
        author: true,
        comments: true
      },
      where: whereClause
    })

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data passed.', { status: 422 })
    }

    return new Response('Could not fetch more posts, please try again later', {
      status: 500
    })
  }
}