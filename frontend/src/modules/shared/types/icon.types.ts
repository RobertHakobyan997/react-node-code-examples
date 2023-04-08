export const enum IconVariant {
  Big = 'Big',
  Small = 'Small',
}

export type IconProps = Partial<{
  width: number
  height: number
  color: string
  style: object
  className: string
  disabled: boolean
  onClick: () => void
}>
