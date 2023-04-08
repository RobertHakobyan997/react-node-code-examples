export const enum Currency {
  // USD = 'USD',
  RUB = 'RUB',
  // EUR = 'EUR',
}

export interface PaginatedResponse<T> {
  count: number
  next: string
  previous: string
  results: T[]
}
