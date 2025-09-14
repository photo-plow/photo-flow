'use client'

export const handleError = (status: string, errorText?: string) => {
  switch (status) {
    case 'FETCH_ERROR':
      return 'Network error. Please check your connection.'

    case 'PARSING_ERROR':
      return 'Server returned invalid data.'

    case 'CUSTOM_ERROR':
      return errorText ?? 'Some error occurred'

    case '400':
      return 'Incorect values'

    case '401':
      return 'You are unauthorized'

    case '403':
      return 'No access rights'

    case '429':
      return 'More than 5 attempts from one IP-address during 10 seconds'

    case '500':
      return 'Internal Server Error'

    default:
      return 'Some error occurred'
  }
}
