import { SharedRouteConstants } from 'src/modules/shared/constants/sharedRoute.constants'

export const stringShorter = ({
  string,
  firstPartLength = 6,
  hasEnding = true,
}: {
  string: string
  firstPartLength?: number
  hasEnding?: boolean
}) => {
  const firstPart = string.slice(0, firstPartLength)
  const middlePart = '...'
  const endPart = hasEnding ? string.slice(-firstPartLength, string.length) : ''

  return string.length > 14 ? `${firstPart}${middlePart}${endPart}` : string
}

export const generateProfileShareLink = (pagePath: string, uuid: string) => {
  return `${pagePath}${SharedRouteConstants.userAccount({ uuid })}`
}

export function numberWithCommas(x: number | string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const isValidUrl = (url?: string) => {
  const pattern = new RegExp(
    '^([a-zA-Z]+:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  )

  if (url === '') return true

  return pattern.test(url ?? '')
}
