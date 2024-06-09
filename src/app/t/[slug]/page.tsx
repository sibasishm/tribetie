import React from 'react'
import { notFound } from 'next/navigation'

import { desc, eq } from 'drizzle-orm'

import {db} from '~/server/db'
import { posts, communities } from '~/server/db/schema'
import { getCurrentUser } from '~/services/user'
import PostFeed from '~/components/feed/post-feed'
import CreatePost from '~/components/post/create-post'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '~/config'

type CommunityPageProps = {
  params: {
    slug: string
  }
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const CommunityPage: React.FC<CommunityPageProps> = async ({ params }) => {
  const currentUser = await getCurrentUser()

  const { slug } = params

  const community = await db.query.communities.findFirst({
    where: eq(communities.name, slug),
    with: {
      posts: {
        with: {
          author: true,
          votes: true,
          comments: true,
          community: true
        },
        limit: INFINITE_SCROLLING_PAGINATION_RESULTS,
        orderBy: [desc(posts.createdAt)]
      }
    }
  })

  if (!community) return notFound()

  return (
    <>
      <h1 className='h-14 text-3xl font-bold md:text-4xl'>
        t/{community.name}
      </h1>
      <CreatePost currentUser={currentUser} />

      <PostFeed
        currentUser={currentUser}
        initialPosts={community.posts}
        communityName={community.name}
      />
    </>
  )
}

export default CommunityPage