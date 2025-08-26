import { z } from 'zod'

export const updateProfileSchema = z.object({
  userName: z
    .string()
    .min(6, 'Minimum number of characters 6')
    .max(30, 'Maximum number of characters 30')
    .regex(/^[a-zA-Z0-9_-]{6,30}$/, 'Username can contain only 0-9, a-z, A-Z, _, -'),
  firstName: z
    .string()
    .min(1, { message: 'First Name must be at least 1 character long' })
    .max(50, { message: 'First Name cannot exceed 50 characters' })
    .regex(/^[a-zA-Zа-яА-ЯёЁ]+$/, {
      message: 'First Name can only contain Latin or Cyrillic letters',
    }),
  lastName: z
    .string()
    .min(1, { message: 'Last Name must be at least 1 character long' })
    .max(50, { message: 'Last Name cannot exceed 50 characters' })
    .regex(/^[a-zA-Zа-яА-ЯёЁ]+$/, {
      message: 'Last Name can only contain Latin or Cyrillic letters',
    }),
  city: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  region: z.string().optional().nullable(),
  aboutMe: z
    .string()
    .max(200, { message: 'About me cannot exceed 200 characters' })
    .optional()
    .nullable()
    .or(z.literal('')),
  dateOfBirth: z.any(),
})

export type UpdateProfileFields = z.infer<typeof updateProfileSchema>
