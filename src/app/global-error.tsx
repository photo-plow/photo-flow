'use client'

import { Button, Header, Typography } from 'photo-flow-ui-kit'

export default function GlobalError() {
  return (
    <html>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header isAuth={true} />

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 16,
            padding: 24,
          }}
        >
          <Typography variant='h2'>Упс... Что-то пошло не так</Typography>

          <Button onClick={() => window.location.replace('/')}>Вернуться на главную</Button>
        </div>
      </body>
    </html>
  )
}
