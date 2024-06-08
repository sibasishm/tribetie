import Link from 'next/link'
import { toast } from './use-toast'

export const useAuthToasts = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: 'Login required.',
      description: 'You need to be logged in to do that.',
      variant: 'destructive',
      action: (
        <Link
          onClick={() => dismiss()}
          href='/login'
          className='btn btn-outline'>
          Login
        </Link>
      ),
    })
  }

  return { loginToast }
}