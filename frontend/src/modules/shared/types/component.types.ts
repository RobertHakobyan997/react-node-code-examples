import React from 'react'

export interface ComponentWithChildren {
  children?: React.ReactNode
}

export interface ComponentWithChildrenCallback<T extends unknown> {
  children: (data: T) => React.ReactNode
}

export interface RegularFunction {
  (): void
}
