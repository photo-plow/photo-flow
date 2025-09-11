'use client'

import { Button, Typography } from 'photo-flow-ui-kit'

export default function NotFound() {
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
        minHeight: '100vh', // Из-за этого есть небольшой скролл
        margin: 0,
        transform: 'translateY(-96px)',
      }}
    >
      <Typography variant='h2'>Упс... Страница не найдена</Typography>

      <Button onClick={() => window.location.replace('/')}>Вернуться на главную</Button>
    </div>
  )
}
