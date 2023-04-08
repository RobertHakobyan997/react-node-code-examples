import { AppThemeConstants } from 'src/modules/shared/constants/style.constants'
import { IconVariant } from 'src/modules/shared/types/icon.types'
import { getSizeByVariant } from 'src/modules/shared/utils/icon.utils'

export function RecycleIcon({
  color = AppThemeConstants.textColor,
  variant = IconVariant.Small,
}: {
  color?: string
  variant?: IconVariant
}) {
  const size = getSizeByVariant({ bigSize: 22, smallSize: 14, variant })

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <path
        d="M3.77731 1.20625H3.66042C3.72471 1.20625 3.77731 1.15365 3.77731 1.08936V1.20625H8.21887V1.08936C8.21887 1.15365 8.27146 1.20625 8.33575 1.20625H8.21887V2.25819H9.27081V1.08936C9.27081 0.573615 8.8515 0.154297 8.33575 0.154297H3.66042C3.14468 0.154297 2.72536 0.573615 2.72536 1.08936V2.25819H3.77731V1.20625ZM11.1409 2.25819H0.855228C0.596624 2.25819 0.387695 2.46712 0.387695 2.72573V3.19326C0.387695 3.25754 0.440293 3.31014 0.504578 3.31014H1.38705L1.74792 10.9514C1.7713 11.4496 2.18331 11.8426 2.68153 11.8426H9.31465C9.81432 11.8426 10.2249 11.4511 10.2483 10.9514L10.6091 3.31014H11.4916C11.5559 3.31014 11.6085 3.25754 11.6085 3.19326V2.72573C11.6085 2.46712 11.3995 2.25819 11.1409 2.25819ZM9.20215 10.7907H2.79403L2.44046 3.31014H9.55572L9.20215 10.7907Z"
        fill={color}
      />
    </svg>
  )
}
