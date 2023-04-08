export const RegexConstants = {
  Numeric: /^\d+$/,
  NumericPhone: /^\+{1}[0-9 ]+$/,
  ExceptNumericPhone: /[^0-9+ ]+/,
  LatinLetters: /^[a-zA-Z\s]+$/,
  ExceptLatinLetters: /[^a-zA-Z\s]/g,
  ValidCreditCardholderName: /^([\w]{1,})+\s+([\w]{1,})+$/i,
  FileExtension: /\.([0-9a-z]+)(?:[?#]|$)/i,
  Name: /^(?=.*[a-zA-Zа-яА-Я\s])[а-яА-Яa-zA-Z0-9\s_'\-.]+$/,
  ValidUuid:
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
}
