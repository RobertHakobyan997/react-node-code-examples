import { SubscriptionPlan } from 'src/modules/model/types/subscription'
import { PurchasePlan } from 'src/modules/model/types/purchase'

export interface UserStateStatusTypes {
  idle: boolean
  loading: boolean
  success: boolean
  error: boolean
}

export const enum UserRole {
  ADMIN = 'Admin',
  STREAMER = 'Streamer',
  MODEL = 'Model',
  ONLINE_SCHOOL = 'Online School',
  MUSICIAN = 'Musician',
  WRITER = 'Writer',
  EXPERT = 'Expert',
  ESOTERIC = 'Esoteric',
  BLOGGER = 'Blogger',
  BUSINESS_CLUB = 'Business Club',
  ARTIST = 'Artist',
}

export const UserVerificationStatus = {
  NotStarted: 'Not Started',
  Pending: 'Pending',
  Rejected: 'Rejected',
  Verified: 'Verified',
}

export type UserVerificationStatusType = keyof typeof UserVerificationStatus

export interface User {
  description: string
  uuid: string
  name: string
  email: string
  role: UserRole | null
  video_link: string
  balance: number
  is_active: boolean
  cover_photo: string
  profile_photo: string
  referral_code: string
  referred_by: number
  referred_code: string
  social_links: string[]
  verification_status: UserVerificationStatusType
}

export type UserType = User | null

export interface UserState {
  user: UserType
  uuid: string | null
}

export interface UserProfileEdit {
  name: string
  cover_photo: string
  profile_photo: string
}

export interface UserProfileCreate extends UserProfileEdit {
  uuid: string
  role: UserRole
  referred_code: string
  is_active?: boolean
}

export interface PublicUser {
  name: string
  role: UserRole
  cover_photo: string
  profile_photo: string
  subscription_plans?: SubscriptionPlan[]
  purchase_plans?: PurchasePlan[]
  social_links: string[]
  video_link: string
  is_active: boolean
  description: string
}

export interface Withdrawal {
  amount: number
  card: string
  card_number: string
  full_name: string
}
