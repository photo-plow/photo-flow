'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetProfileQuery, useUpdateProfileMutation } from '@/lib/feature/profile/api/profileApi'
import { useEffect } from 'react'
import { useAlert } from 'photo-flow-ui-kit'
import { cityList, countriesList, Country } from '@/constants/countries&cities'
import {
  UpdateProfileFields,
  updateProfileSchema,
} from '@/lib/feature/profile/schemas/updateProfileSchema'
import { AddProfilePhoto } from '@/lib/feature/profile/ui/components/profile/GeneralInformation/addProfilePhoto/AddProfilePhoto'
import { Input } from 'photo-flow-ui-kit'
import { DatePicker } from 'photo-flow-ui-kit'
import { Select } from 'photo-flow-ui-kit'
import { Button } from 'photo-flow-ui-kit'
import { Textarea } from 'photo-flow-ui-kit'
import { checkAge } from '@/utils/checkAge'
import { useTranslation } from 'react-i18next'

export const GeneralInformation = () => {
  const { data: profile } = useGetProfileQuery()
  const [updateProfile] = useUpdateProfileMutation()
  const { showAlert } = useAlert()!
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<UpdateProfileFields>({
    mode: 'onTouched',
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      userName: '',
      firstName: '',
      lastName: '',
      city: '',
      country: '',
      region: '',
      aboutMe: '',
      dateOfBirth: '',
    },
  })

  const countryFromForm = watch('country') as Country

  useEffect(() => {
    if (profile) {
      reset({
        ...profile,
      })
    }
  }, [profile, reset])

  useEffect(() => {
    const cities = cityList[countryFromForm]
    if (cities && cities.length > 0) {
      setValue('city', profile?.city) // Что-то вызывает перерендер. Обнуляется город. Это костыль, чтобы выбранный город отображался
    }
  }, [countryFromForm, setValue, profile?.city])

  const onSubmit = async (data: UpdateProfileFields) => {
    try {
      const payload = {
        ...data,
      }

      if (!checkAge({ showAlert, birthDate: payload.dateOfBirth })) return

      const res = await updateProfile(payload)
      if (!res.data) {
        showAlert({ message: t('profile_settings_saved'), type: 'success' })
      } else {
        showAlert({ message: t('common_error_serverUnavailable'), type: 'error' })
      }
    } catch (error: unknown) {
      if (typeof error === 'string') {
        showAlert({ message: error, type: 'error' })
      } else if (error instanceof Error) {
        showAlert({ message: error.message, type: 'error' })
      } else {
        showAlert({ message: t('common_somethingWentWrong'), type: 'error' })
      }
    }
  }

  return (
    <div className={`flex w-full gap-9`}>
      <AddProfilePhoto />
      <form onSubmit={handleSubmit(onSubmit)} action='#' className='w-full'>
        <div className='flex w-full flex-col gap-6'>
          <Input
            label={
              <>
                {t('profile_username_label')}
                <span className='text-red-500'>*</span>
              </>
            }
            {...register('userName')}
            placeholder={profile?.userName || ''}
            errorText={errors.userName?.message}
          />
          <Input
            label={
              <>
                {t('profile_firstName_label')}
                <span className='text-red-500'>*</span>
              </>
            }
            {...register('firstName')}
            placeholder={profile?.firstName || ''}
            errorText={errors.firstName?.message}
          />
          <Input
            label={
              <>
                {t('profile_lastName_label')}
                <span className='text-red-500'>*</span>
              </>
            }
            {...register('lastName')}
            placeholder={profile?.lastName || ''}
            errorText={errors.lastName?.message}
          />

          <Controller
            control={control}
            name='dateOfBirth'
            render={({ field }) => (
              <DatePicker
                isOnlySingleMode
                value={new Date(field.value as string)}
                onValueChange={field.onChange}
                title={
                  <>
                    {t('profile_dob_label')}
                    <span className='text-red-500'>*</span>
                  </>
                }
                defaultDate={profile?.dateOfBirth}
              />
            )}
          />
          <div className='flex items-center justify-between gap-6'>
            <Controller
              control={control}
              name='country'
              render={({ field }) => {
                return (
                  <Select
                    value={field.value ?? ''}
                    onValueChange={value => {
                      field.onChange(value)
                    }}
                    items={countriesList}
                    title={t('profile_selectCountry_title')}
                    placeholder={t('profile_country_placeholder')}
                    className='w-[358px]'
                  />
                )
              }}
            />
            <Controller
              control={control}
              name='city'
              render={({ field }) => {
                return (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    items={cityList[countryFromForm as Country] || []}
                    title={t('profile_selectCity_title')}
                    placeholder={t('profile_city_placeholder')}
                    className='w-[358px]'
                  />
                )
              }}
            />
          </div>
          <Textarea
            {...register('aboutMe')}
            className={'min-h-[85px] w-full'}
            placeholder={t('profile_about_label')}
            textareaLabel={t('profile_about_label')}
            maxLength={200}
            error={errors.aboutMe?.message}
          ></Textarea>
          <hr className='text-dark-300 -ml-[232px] flex h-[1px] outline-none' />
          <div className='flex justify-end'>
            <Button variant='primary' disabled={!isValid} type='submit'>
              {t('common_saveChanges')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
