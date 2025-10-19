'use client'

import { Button, Typography } from 'photo-flow-ui-kit'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 16,
        padding: 0,
        margin: 0,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translateY(-96px)',
      }}
    >
      <Typography variant='h2'>{t('error_404_title')}</Typography>

      <Button onClick={() => window.location.replace('/')}>{t('common_goHome')}</Button>
    </div>
  )
}
