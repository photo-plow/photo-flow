'use client'

import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { useAlert } from 'photo-flow-ui-kit'
import { setAppError } from '@/lib/appSlice'

// Компонент, который отлавливает ошибку из стора и высвечивает ее
// Пользование:

// Приходит ошибка в catch после запроса на сервер
// Я достаю из нее код и вызываю утилитку handleError
// Утилитка смотрит на статус и в зависимости от статуса возвращает текст ошибки
// Возвращенный тип ошибки диспатчим в стор ошибки
// GlobalErrorAlert высвечивает алерт и обнуляет ошибку в сторе

export function GlobalErrorAlert() {
  const error = useAppSelector(s => s.app.error)
  const dispatch = useAppDispatch()
  const alert = useAlert()

  useEffect(() => {
    if (!error || !alert) return
    alert.showAlert({ message: error, type: 'error' })
    dispatch(setAppError({ error: '' }))
  }, [error, alert, dispatch])

  return null
}
