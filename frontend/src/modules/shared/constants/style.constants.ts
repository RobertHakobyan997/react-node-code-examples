import { AppTheme } from '../types/style.types'

export const AppThemeConstants: AppTheme = {
  primaryColor: '#42A5FE',
  primaryHover: '#027EEF',
  primaryActive: '#006BCF',
  secondaryColor: '#3D424E',
  modalBackground: '#1A1E29',
  inputBackground: '#262C36',
  tableTitle: '#202633',
  inputSelectedBackground: '#2C323E',
  inputStroke: '#38425C',
  inputPlaceholder: '#535A65',
  textColor: '#fdfdfd',
  textDarker: '#8C8C8C',
  primaryBackgroundColor: '#0F3354',
  successColor: '#75C84C',
  whiteColor: '#FFFFFF',
  yellowColor: '#F4A100',
  orangeColor: '#FAAD14',
  dangerColor: '#FA4B5E',
  purpleColor: '#A274FF',
  primaryRadius: '0.5rem',
  calendulaGold: '#FFFBE6',
  popupBackground: 'rgba(255, 235, 228, 0.9)',
  ticketColor: 'rgba(31, 36, 49, 0.5)',
  borderDark: '#262C36',
  transition: '0.1s',
}

export const BreakPointSize = {
  Mobile: 375,
  Tablet: 768,
  Laptop: 992,
  LargeScreen: 1200,
  390: 390,
  430: 430,
  744: 744,
}

export const MediaBreakPoints = {
  Mobile: `@media (max-width: ${BreakPointSize.Mobile}px)`,
  Tablet: `@media (max-width: ${BreakPointSize.Tablet}px)`,
  Laptop: `@media (max-width: ${BreakPointSize.Laptop}px)`,
  LargeScreen: `@media (max-width: ${BreakPointSize.LargeScreen}px)`,
  Mobile390To430: `@media screen and (max-width: ${BreakPointSize[430]}px) and (min-width: ${BreakPointSize[390]}px) `,
  Mobile430: `@media (max-width: ${BreakPointSize[430]}px)`,
  Mobile744: `@media (max-width: ${BreakPointSize[744]}px)`,
}
