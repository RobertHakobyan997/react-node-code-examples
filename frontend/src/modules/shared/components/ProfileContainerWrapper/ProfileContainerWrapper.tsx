import { ComponentWithChildren } from '../../types/component.types'

export function ProfileContainerWrapper({ children }: ComponentWithChildren) {
  return <div style={{ width: 'calc(100% - 30px)' }}>{children}</div>
}
