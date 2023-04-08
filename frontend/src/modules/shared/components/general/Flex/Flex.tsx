import { CSSProperties, FC } from 'react'
import { ComponentWithChildren } from '../../../types/component.types'

interface IFlexProps extends ComponentWithChildren {
  direction?: 'row' | 'column'
  alignItems?:
    | 'stretch'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'initial'
    | 'inherit'
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'space-between'
    | 'flex-end'
    | 'space-around'
  flexWrap?: 'nowrap' | 'wrap'
  style?: CSSProperties
  className?: string
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const Flex: FC<IFlexProps> = ({
  children,
  direction = 'row',
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  flexWrap = 'nowrap',
  style = {},
  className = '',
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{
        display: 'flex',
        flexDirection: direction,
        alignItems,
        justifyContent,
        flexWrap,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default Flex
