'use client'

import IconGoogle from '@/assets/icons/google.svg'
import { withLocale } from '@/i18n/utils'

export const GoogleLoginButton = () => {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

    const redirectUri = withLocale(`${window.location.origin}/auth/google/callback`)
    const scope = 'openid email profile'

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline&prompt=consent`
  }

  return (
    <button className='cursor-pointer' onClick={handleLogin}>
      <IconGoogle width={'36'} height={'36'} />
    </button>
  )
}
//GOOGLE_CLIENT_ID=272583913867-t74i019ufdvmarh05jlv8bcu1ak0a6o6.apps.googleusercontent.com
