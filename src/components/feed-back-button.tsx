'use client'

import { usePathname } from 'next/navigation'

import { ChevronLeft } from 'lucide-react'

import { getCommunityPath } from '~/lib/utils'

const ToFeedButton = () => {
  const pathname = usePathname()

  const communityPath = getCommunityPath(pathname)

  return (
    <a href={communityPath} className='btn btn-ghost'>
      <ChevronLeft className='mr-1 h-4 w-4' />
      {communityPath === '/' ? 'Back home' : 'Back to community'}
    </a>
  )
}

export default ToFeedButton