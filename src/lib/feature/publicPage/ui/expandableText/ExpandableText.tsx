'use client'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Typography } from 'photo-flow-ui-kit'
import { useTranslation } from 'react-i18next'

type PropsType = {
  text: string
  maxLength?: number
  className: string
}
export default function ExpandableText({ text, maxLength = 72, className }: PropsType) {
  const [expanded, setExpanded] = useState(false)
  const isLong = text.length > maxLength
  const displayText = expanded || !isLong ? text : text.slice(0, maxLength)
  const { t } = useTranslation()

  return (
    <div>
      <Typography
        variant={'regular_text_14'}
        className={twMerge(className, 'whitespace-pre-wrap, inline break-all')}
      >
        {displayText}
        {isLong && !expanded && '... '}
        {isLong && (
          <>
            <span> </span>
            <Typography
              variant={'regular_link'}
              className={'inline'}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? t('common_hide') : t('common_showMore')}
            </Typography>
          </>
        )}
      </Typography>
    </div>
  )
}
