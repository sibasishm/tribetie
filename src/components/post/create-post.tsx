'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { ImageIcon, Link2 } from 'lucide-react'

import type { SafeUser } from '~/lib/types'

import UserAvatar from '../user-avatar'

type MiniCreatePostProps = {
  currentUser: SafeUser | null | undefined
}

const CreatePost: React.FC<MiniCreatePostProps> = ({ currentUser }) => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className='overflow-hidden rounded-md bg-base-100 shadow'>
      <div className='flex h-full justify-between gap-6 px-6 py-4'>
        <div className='relative'>
          <UserAvatar currentUser={currentUser} />

          <span className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 outline outline-2 outline-white' />
        </div>
        <input
          readOnly
          onClick={() => void router.push(`${pathname}/submit`)}
          placeholder='Create post'
        />

        <button
          className='btn btn-ghost'
          onClick={() => void router.push(`${pathname}/submit`)}
        >
          <ImageIcon className='text-zinc-600' />
        </button>

        <button
          className='btn btn-ghost'
          onClick={() => void router.push(`${pathname}/submit`)}
        >
          <Link2 className='text-zinc-600' />
        </button>
      </div>
    </div>
  )
}

export default CreatePost