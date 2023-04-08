import {
  Currency,
  PaginatedResponse,
} from 'src/modules/shared/types/response.types'

export interface CreateDonation {
  currency: Currency
  user_uuid: string
  nickname: string
  email: string
  notes: string
  amount: string
}

export type Donation = Omit<CreateDonation, 'user_uuid' | 'email'> & {
  created_at: string
}

export type DonationResponse = PaginatedResponse<Donation>

export interface DonateCreate extends CreateDonation {}
