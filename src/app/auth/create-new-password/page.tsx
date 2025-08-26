import { Suspense } from 'react'
import CreateNewPassword from '@/app/auth/create-new-password/CreateNewPassword'
import { Loader } from 'photo-flow-ui-kit'

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <CreateNewPassword />
    </Suspense>
  )
}
