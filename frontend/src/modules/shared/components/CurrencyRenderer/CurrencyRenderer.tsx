import { Currency } from 'src/modules/shared/types/response.types'
import {
  RubliBigListIcon,
  RubliPlanIcon,
} from 'src/modules/shared/components/Icons/Amount.icon'
import { AppThemeConstants } from 'src/modules/shared/constants/style.constants'

export const enum CurrencyIconVariant {
  Small = 'Small',
  Big = 'Big',
}

export function CurrencyRenderer({
  currency,
  size,
  variant,
  color = AppThemeConstants.textColor,
}: {
  size?: number
  currency: Currency
  variant: CurrencyIconVariant
  color?: string
}) {
  switch (currency) {
    // case Currency.EUR:
    //   return variant === CurrencyIconVariant.Small ? (
    //     <EuroPlanIcon size={size} color={color} />
    //   ) : (
    //     <EuroBigListIcon />
    //   )
    case Currency.RUB:
      return variant === CurrencyIconVariant.Small ? (
        <RubliPlanIcon size={size} color={color} />
      ) : (
        <RubliBigListIcon />
      )

    // case Currency.USD:
    //   return variant === CurrencyIconVariant.Small ? (
    //     <DollarPlanIcon color={color} />
    //   ) : (
    //     <DollarBigListIcon />
    //   )

    default:
      return variant === CurrencyIconVariant.Small ? (
        <RubliPlanIcon size={size} color={color} />
      ) : (
        <RubliBigListIcon />
      )
  }
}
