import { Suspense } from 'react'
import ConfirmationPage from '@/app/auth/confirm-email/ConfirmationPage'
import { Loader } from 'photo-flow-ui-kit'

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <ConfirmationPage />
    </Suspense>
  )
}
