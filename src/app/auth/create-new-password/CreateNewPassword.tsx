'use client'

import { Card } from 'photo-flow-ui-kit'
import { Typography } from 'photo-flow-ui-kit'
import { Input } from 'photo-flow-ui-kit'
import { Button } from 'photo-flow-ui-kit'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createNewPasswordSchema,
  NewPasswordFields,
} from '@/lib/feature/auth/schemas/createNewPasswordSchema'
import { useCreateNewPasswordMutation } from '@/lib/feature/auth/api/authApi'
import { useRouter, useSearchParams } from 'next/navigation'

export default function CreateNewPassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NewPasswordFields>({
    mode: 'onTouched',
    resolver: zodResolver(createNewPasswordSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  })

  const [createPassword] = useCreateNewPasswordMutation()

  const onSubmitHandler = async (data: NewPasswordFields) => {
    try {
      await createPassword({
        newPassword: data.password,
        recoveryCode: code,
      }).unwrap()
      reset()
      router.push('/auth/sign-in')
    } catch (err) {
      // Добавить сюда корректную обработку ошибок
      console.log(err)
    }
  }

  return (
    <Card className={'mx-auto mt-6 flex w-[378px] flex-col items-center px-6 pt-6 pb-9'}>
      <Typography variant={'h1'} className={'mb-9.5'}>
        Create New Password
      </Typography>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Input
          errorText={errors.password?.message}
          type={'password'}
          className={'min-h-21'}
          label={'New password'}
          {...register('password')}
        />
        <Input
          errorText={errors.passwordConfirmation?.message}
          type={'password'}
          className={'mb-2'}
          label={'Password confirmation'}
          {...register('passwordConfirmation')}
        />
        <Typography variant={'regular_text_14'} className={'text-light-900 mb-10'}>
          Your password must be between 6 and 20 characters
        </Typography>
        <Button className={'w-full'} disabled={!isValid}>
          <Typography variant={'h3'}>Create new password</Typography>
        </Button>
      </form>
    </Card>
  )
}
