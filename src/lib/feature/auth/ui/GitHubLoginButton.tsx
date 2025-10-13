'use client'
import IconGitHub from '@/assets/icons/github-svgrepo-com.svg'
import { withLocale } from '@/i18n/utils'

export const GitHubLoginButton = () => {
  const handleLogin = () => {
    const redirect = encodeURIComponent(
      withLocale(`${window.location.origin}/auth/github/callback`)
    )
    window.location.href = withLocale(
      `http://inctagram.work/api/v1/auth/github/login?redirect_url=${redirect}`
    )
  }
  return (
    <button className='cursor-pointer' onClick={handleLogin}>
      <IconGitHub width={'36'} height={'36'} />
    </button>
  )
}
