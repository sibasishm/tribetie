'use client'

import React, { startTransition } from 'react'
import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'
import ky, { HTTPError } from 'ky'
import { Loader2 } from 'lucide-react'

import type { SubscribeToCommunityPayload } from '~/lib/validators/community'
import { useAuthToasts } from '~/hooks/use-auth-toats'
import { toast } from '~/hooks/use-toast'

type SubscribeLeaveToggleProps = {
  communityId: number
  communityName: string
  isSubscribed: boolean
}

const SubscribeLeaveToggle: React.FC<SubscribeLeaveToggleProps> = ({
  communityId,
  communityName,
  isSubscribed
}) => {
  const router = useRouter()

  const { loginToast } = useAuthToasts()

  const { mutate: subscribe, isPending: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToCommunityPayload = {
        communityId
      }

      const data = await ky.post(
        '/api/community/subscribe',
        {
          json: payload
        }
      ).json<string>()  

      return data
    },
    onError: (error) => {
      if (error instanceof HTTPError && error.response?.status === 401) {
        return loginToast()
      }

      return toast({
        title: 'There was a problem',
        description: 'Something went wrong please try again',
        variant: 'destructive'
      })
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      })

      return toast({
        title: 'Subscribe',
        description: `You are now subscribed to r/${communityName}`
      })
    }
  })

  const { mutate: unsubscribe, isPending: isUnsubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToCommunityPayload = {
        communityId
      }

      const data = await ky.post(
        '/api/community/unsubscribe',
        {
          json: payload
        }
      ).json<string>()

      return data
    },
    onError: (error) => {
      if (error instanceof HTTPError && error.response?.status === 401) {
        return loginToast()
      }

      return toast({
        title: 'There was a problem',
        description: 'Something went wrong please try again',
        variant: 'destructive'
      })
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      })

      return toast({
        title: 'Unsubscribe',
        description: `You are now unsubscribed from r/${communityName}`
      })
    }
  })

  return isSubscribed ? (
    <button
      onClick={() => void unsubscribe()}
      disabled={isUnsubLoading}
      className='btn mb-4 mt-1 btn-block btn-accent'
    >
      {isUnsubLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}{' '}
      Leave community
    </button>
  ) : (
    <button
      onClick={() => void subscribe()}
      disabled={isSubLoading}
      className='btn mb-4 mt-1 btn-block btn-accent'
    >
      {isSubLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />} Join
      to post
    </button>
  )
}

export default SubscribeLeaveToggle