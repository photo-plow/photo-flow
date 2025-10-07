import { Suspense } from 'react'
import CheckCodePassword from '@/app/[lng]/auth/check-code-password/CheckCodePassword'

export default function Page() {
  return (
    <Suspense>
      <CheckCodePassword />
    </Suspense>
  )
}
