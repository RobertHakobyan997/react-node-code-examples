export const MessageConstants = {
  InvalidEmail: () => 'Введите правильный email-адрес',
  InvalidPhone: () => 'Неправильный номер телефона',
  InvalidField: (fieldName: string) => `Неправильный формат ${fieldName}`,
  ValidName: () => 'Как минимум одна буква на кириллице или латинице',
  Required: () => 'Обязательное поле',
  Link: () => 'Неправильная ссылка',
  RoundNumbers: () => `Только цельные числа`,
  NumbersSpace: (start: number, end: number) =>
    `Только цельные числа от ${start} до ${end}`,
  NumberMax: (max: number) => `Только цельные числа до ${max}`,
  SymbolMax: (contentName: string, max: number) =>
    `${contentName} не должно содержать более ${max} символов.`,
  StringMax: (symbolsLength: number) => `Максимум ${symbolsLength} символов`,
  StringMin: (symbolsLength: number) => `Минимум ${symbolsLength} символов`,
  MinAmount: () => 'Минимальный донат 50₽',
  InvalidAmount: () => 'Сумма запроса превышает ваш баланс',
}

export const CreditCardMessages = {
  Number: 'Введите номер карты',
  RequiredName: 'Введите имя держателя',
  ValidName: 'Введите правильное имя держателя',
  Code: '3 или 4 цифры',
  CodeMin: '4 цифры',
}

export const FormConstants = {
  loginTitle: 'или введите адрес эл. почты',
  loginSubmitTitle: 'Войти',
  registerSubmitTitle: 'Продолжить',
  registerTitle: 'или зарегистрируйтесь с помощью эл. почты',
}

export const ErrorMessage: { [key: string]: (content?: string) => string } = {
  invalidName: (contentName?: string) =>
    `${contentName} с таким именем уже существует`,
  default: () => 'Что то пошло не так',
  invalidProvider: (provider?: string) =>
    `Вы уже зарегистрированы через ${provider} аккаунт`,
  invalidEmail: () => 'Введите правильный email адресс',
  invalidAmount: () => 'Сумма запроса превышает ваш баланс',
  invalidOTP: () => 'Неверный код',
  emptyEmail: () => 'Аккаунт не имеет адреса электронной почты',
  'ErrorCode.INVALID_REFERRAL_CODE': () => 'Неверный реферальный код',
}

export const ProfileImageMessage = {
  Profile:
    'Рекомендуем использовать изображениe размером 1024x1024 и в формате  JPG, WEBP и PNG',
  Background:
    'Рекомендуем использовать изображениe размером 1084x400 и в формате  JPG, WEBP и PNG',
  TypeError: 'Выберите один из этих форматов` JPG, WEBP и PNG',
  SizeError: 'Слишком большой файл',
  PaymentFormImage:
    'Рекомендуем использовать изображениe размером 1024x768 в формате  JPG, WEBP и PNG',
}

export const WithdrawalMessages = {
  minAmount: (amount: number) => `Минимальный вывод ${amount}₽`,
  maxAmount: (amount: number) => `Максимальный вывод ${amount}₽`,
}
