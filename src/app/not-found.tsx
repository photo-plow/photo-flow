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
        margin: 0,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translateY(-96px)',
      }}
    >
      <Typography variant='h2'>Упс... Страница не найдена</Typography>

      <Button onClick={() => window.location.replace('/')}>Вернуться на главную</Button>
    </div>
  )
}
