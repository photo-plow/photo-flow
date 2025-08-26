import { differenceInYears } from 'date-fns'
import { ReactNode } from 'react'

type showAlertType = {
  showAlert: (alert: { message: ReactNode; type: 'error' | 'success' }) => void
  birthDate: string | null
}

export const checkAge = ({ showAlert, birthDate }: showAlertType) => {
  if (birthDate == null) {
    return false
  }

  const age = differenceInYears(new Date(), new Date(birthDate))

  if (age < 13) {
    showAlert({
      message: (
        <>
          A user under 13 cannot create a profile.{' '}
          <a href='/auth/sign-up/privacy' target='_blank' className='text-blue-500 underline'>
            Privacy Policy
          </a>
        </>
      ),
      type: 'error',
    })
    return false
  }

  if (age > 130) {
    showAlert({ message: 'A user after 130 cannot create a profile', type: 'error' })
    return false
  }

  return true
}
