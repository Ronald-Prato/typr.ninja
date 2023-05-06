import { CLIENT_API_URL } from '@/constants'
import { UserData } from '@/types/user'
import { cookies } from 'next/headers'

export default async function QueueLayout(props: {
  children: React.ReactNode
  params: { userData: UserData }
}) {
  const uid = cookies().get('uid')?.value

  if (uid) {
    const response = await fetch(`${CLIENT_API_URL}/api/get-user?uid=${uid}`, {
      cache: 'no-store',
    })

    const userData = await response.json()

    props.params.userData = userData.data
  }

  return props.children
}
