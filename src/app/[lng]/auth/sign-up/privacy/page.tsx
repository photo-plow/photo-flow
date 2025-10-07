import ArrowBack from '@/assets/icons/arrow-back-outline.svg'
import { Typography } from 'photo-flow-ui-kit'
import { I18nLink } from '@/i18n/hooks'
import { Locale } from '@/i18n/utils/withLocale'
import { getServerTranslate } from '@/i18n/utils'

type PrivacyPolicyProps = {
  params: { lng: Locale }
}

export default async function PrivacyPolicy({ params: { lng } }: PrivacyPolicyProps) {
  const t = await getServerTranslate(lng)
  return (
    <>
      <I18nLink href='/auth/sign-up' className={'mb-6 flex gap-3 px-16'}>
        <ArrowBack className={'h-6 w-6'} />
        <Typography variant={'regular_text_14'}>{t('auth_terms_back')}</Typography>
      </I18nLink>
      <div className={'px-[160px] text-center'}>
        <Typography className={'mb-5'} variant={'h1'}>
          {t('auth_privacy_title')}
        </Typography>
        <Typography variant={'regular_text_14'}>{t('auth_privacy_p1')}</Typography>
        <Typography variant={'regular_text_14'}>{t('auth_privacy_p2')}</Typography>
        <Typography variant={'regular_text_14'}>{t('auth_privacy_p3')}</Typography>
      </div>
    </>
  )
}
