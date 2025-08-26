import { Suspense } from 'react'
import GitHubCallback from '@/app/auth/github/callback/GitHubCallback'
import { Loader } from 'photo-flow-ui-kit'

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <GitHubCallback />
    </Suspense>
  )
}
