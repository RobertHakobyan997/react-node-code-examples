import { MessageConstants } from 'src/modules/shared/constants/message.constants'
import { object, string, array, mixed } from 'yup'
import { RegexConstants } from 'src/modules/shared/constants/regex.constants'
import { isValidUrl } from 'src/modules/shared/utils/string.utils'
import {
  imageUploadValidation,
  imageValidation,
} from 'src/modules/shared/utils/validation.utils'

export const editProfileSchema = object({
  name: string()
    .matches(RegexConstants.Name, MessageConstants.ValidName())
    .min(1, MessageConstants.StringMin(1))
    .max(50, MessageConstants.StringMax(50))
    .required(MessageConstants.Required()),
  cover_photo: mixed().test(
    'validImage',
    (data: any) => imageValidation(data.value),
    imageUploadValidation
  ),
  profile_photo: mixed().test(
    'validImage',
    (data: any) => imageValidation(data.value),
    imageUploadValidation
  ),
  video_link: string()
    .test('isValidUrl', MessageConstants.Link(), isValidUrl)
    .max(200, MessageConstants.StringMax(200)),

  social_links: array()
    .of(
      string()
        .test('isValidUrl', MessageConstants.Link(), isValidUrl)
        .test('emptyString', MessageConstants.Link(), (value) => Boolean(value))
        .max(200, MessageConstants.StringMax(200))
    )
    .test('isUnique', 'Адресс уже сушествует', (list) => {
      const set = new Set(list)
      const uniqueList = Array.from(set)
      return uniqueList.length === (list?.length ?? 0)
    })
    .nullable(),

  description: string().max(300, MessageConstants.StringMax(300)),
})
