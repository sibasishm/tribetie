'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'
import ky, { HTTPError } from 'ky'
import { Loader2 } from 'lucide-react'

import type { CreateCommunityPayload } from '~/lib/validators/community'
import { useAuthToasts } from '~/hooks/use-auth-toats'
import { toast } from '~/hooks/use-toast'

const CreateCommunityPage = () => {
  const router = useRouter()
  const [input, setInput] = useState('')

  const { loginToast } = useAuthToasts()

  const { mutate: createCommunity, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateCommunityPayload = {
        name: input
      }

      const data = await ky.post('/api/community', {
        json: payload
      }).json<string>()

      return data
    },
    onError: (error) => {
      if (error instanceof HTTPError) {
        switch (error.response?.status) {
          case 401:
            return loginToast()
          case 409:
            return toast({
              title: 'Community already exists.',
              description: 'Please choose a different community name.',
              variant: 'destructive'
            })
          case 422:
            return toast({
              title: 'Invalid community name.',
              description: 'Please choose a name between 3 and 21 characters.',
              variant: 'destructive'
            })

          default:
            return
        }
      }

      toast({
        title: 'There was an error.',
        description: 'Could not create community.',
        variant: 'destructive'
      })
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`)
    }
  })

  return (
    <div className='container mx-auto flex h-full max-w-3xl items-center'>
      <div className='h-fit w-full space-y-6 rounded-lg bg-white p-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-semibold'>Create a community</h1>
        </div>

        <hr className='h-px bg-zinc-500' />

        <div>
          <p className='text-lg font-medium'>Name</p>
          <p className='pb-2 text-xs'>
            Community names including capitalization can not be changed.
          </p>

          <div className='relative'>
            <p className='absolute inset-y-0 left-0 grid w-8 place-items-center text-sm text-zinc-400'>
              r/
            </p>
            <input type="text" placeholder="Unique community name" value={input} className="input input-bordered input-md w-full max-w-xs pl-6" onChange={(e) => setInput(e.target.value)}/>
          </div>
        </div>
        <div className='flex justify-end gap-4'>
          <button
            disabled={isLoading}
            className="btn btn-secondary"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            disabled={input.length === 0 || isLoading}
            onClick={() => void createCommunity()}
            className="btn btn-primary"
          >
            {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}{' '}
            Create Community
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateCommunityPage