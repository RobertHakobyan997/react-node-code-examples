import { RubliIconRoundFilled } from 'src/modules/shared/components/Icons/Amount.icon'
import { Currency } from 'src/modules/shared/types/response.types'
import {
  AmericanExpressCardIcon,
  MasterCardIcon,
  MirCardIcon,
  UnionPayCardIcon,
  VisaCardIcon,
} from 'src/modules/shared/components/Icons/CreditCard.icon'

export const PriceOptions = [
  {
    id: 1,
    content: <RubliIconRoundFilled />,
    nameId: Currency.RUB,
  },

  // {
  //   id: 2,
  //   content: <DollarIconFilled />,
  //   nameId: Currency.USD,
  // },
  // {
  //   id: 3,
  //   content: <EuroIconRegular />,
  //   nameId: Currency.EUR,
  // },
]

export const CreditCardIcons = [
  { id: 1, nameId: 'visa', content: <VisaCardIcon /> },
  { id: 2, nameId: 'american-express', content: <AmericanExpressCardIcon /> },
  { id: 3, nameId: 'mastercard', content: <MasterCardIcon /> },
  { id: 4, nameId: 'mir', content: <MirCardIcon /> },
  { id: 5, nameId: 'unionpay', content: <UnionPayCardIcon /> },
]
