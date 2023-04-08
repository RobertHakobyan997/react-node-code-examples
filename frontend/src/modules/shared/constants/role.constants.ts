import { UserRole } from '../types/user.types'

export const UserRolePlaceholder = {
  id: -1,
  nameId: UserRole.MODEL,
  content: 'Выберите тип профиля',
}

export const UserRoles = [
  {
    id: 0,
    nameId: UserRole.STREAMER,
    content: 'Стример',
  },
  {
    id: 1,
    nameId: UserRole.MODEL,
    content: 'Модель',
  },
  {
    id: 2,
    nameId: UserRole.ONLINE_SCHOOL,
    content: 'Онлайн школа',
  },
  {
    id: 3,
    nameId: UserRole.MUSICIAN,
    content: 'Музыкант',
  },
  {
    id: 4,
    nameId: UserRole.WRITER,
    content: 'Автор книг',
  },
  {
    id: 5,
    nameId: UserRole.EXPERT,
    content: 'Эксперт',
  },
  {
    id: 6,
    nameId: UserRole.ESOTERIC,
    content: 'Эзотерик',
  },
  {
    id: 7,
    nameId: UserRole.BLOGGER,
    content: 'Блогер',
  },
  {
    id: 8,
    nameId: UserRole.BUSINESS_CLUB,
    content: 'Бизнес клуб',
  },
  {
    id: 9,
    nameId: UserRole.ARTIST,
    content: 'Художник',
  },
]
