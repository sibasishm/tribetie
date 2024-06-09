import { z } from 'zod'

export const CommunityValidator = z.object({
  name: z.string().min(3).max(21)
})

export const CommunitySubscriptionValidator = z.object({
  communityId: z.number()
})

export type CreateCommunityPayload = z.infer<typeof CommunityValidator>
export type SubscribeToCommunityPayload = z.infer<
  typeof CommunitySubscriptionValidator
>