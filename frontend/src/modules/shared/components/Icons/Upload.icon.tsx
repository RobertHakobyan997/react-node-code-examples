import { AppThemeConstants } from '../../constants/style.constants'

export function UploadIcon({
  isHovered = false,
  color,
}: {
  isHovered?: boolean
  color?: string
}) {
  const fillColor = isHovered
    ? AppThemeConstants.primaryColor
    : AppThemeConstants.textColor

  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.5 8H6.5V3.5H8L6 1L4 3.5H5.5V8Z" fill={color ?? fillColor} />
      <path
        d="M2.5 11H9.5C10.0515 11 10.5 10.5515 10.5 10V5.5C10.5 4.9485 10.0515 4.5 9.5 4.5H7.5V5.5H9.5V10H2.5V5.5H4.5V4.5H2.5C1.9485 4.5 1.5 4.9485 1.5 5.5V10C1.5 10.5515 1.9485 11 2.5 11Z"
        fill={color ?? fillColor}
      />
    </svg>
  )
}
