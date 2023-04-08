import { createUseStyles } from 'react-jss'
import { AppTheme } from 'src/modules/shared/types/style.types'
import cardBack from 'src/assets/images/cardBack.svg'
import card from 'src/assets/images/card.svg'
import { MediaBreakPoints } from 'src/modules/shared/constants/style.constants'

export const creditCardUseStyles = createUseStyles((theme: AppTheme) => ({
  input: {
    height: '32px',
    lineHeight: '15px',
    fontSize: '14px',
  },

  cardWrapper: {
    position: 'relative',
    height: '375px',
    width: '550px',
  },

  card: {
    position: 'relative',
    backgroundImage: `
    url(${card}),
    linear-gradient(109.34deg, rgba(10, 12, 18, 0.7) 1.42%, rgba(5, 6, 14, 0.7) 94.78%)
    `,
    backgroundPosition: 'center',
    width: '400px',
    height: '250px',
    backdropFilter: 'blur(20px)',
    borderRadius: '12px',
    zIndex: '9',
    padding: '20px',
    boxSizing: 'border-box',
  },

  frontCardContent: {
    position: 'relative',
    top: '40px',
  },
  cardIconLogo: {
    position: 'absolute',
    right: '20px',
    top: '26px',
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0 6px',
  },

  frontCardContentBottom: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '28px',
  },

  cardBack: {
    composes: '$card',
    zIndex: '1',
    backgroundBlendMode: 'multiply',
    right: 0,
    top: '-150px',
    left: '150px',
    background: `
    linear-gradient(109.34deg, rgba(10, 12, 18, 0.7) 1.42%, rgba(5, 6, 14, 0.7) 94.78%),
    url(${cardBack})
    `,

    '&:before': {
      content: "''",
      display: 'block',
      width: '100%',
      height: '100%',
      background: `url(${card})`,
      position: 'absolute',
      left: 0,
      top: 0,
    },

    // '&:after': {
    //   content: "''",
    //   display: 'block',
    //   width: '100%',
    //   height: '100%',
    //   background: `url(${cardBack})`,
    //   position: 'absolute',
    //   left: 0,
    //   top: 0,
    // },
  },

  durationTitle: {
    fontWeight: 400,
    fontSize: '12px',
    marginBottom: '8px',
    lineHeight: '1rem',
    color: theme.textColor,
  },

  separator: {
    margin: '0 8px',
    color: theme.textDarker,
  },

  cvv: {
    position: 'absolute',
    bottom: '32px',
    right: '20px',
    maxWidth: '140px',
  },

  cardWrapperResponsive: {
    background: 'rgba(31, 36, 49, 0.5)',
    border: `1px solid ${theme.inputStroke}`,
    width: '100%',
    borderRadius: '8px',
    padding: '20px 10px',
    boxSizing: 'border-box',
  },

  responsiveHeaderText: {
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '16px',
    color: theme.textColor,
    marginBottom: '8px',
  },

  cardIconLogoResponsive: {
    border: `1px solid ${theme.inputBackground}`,
    borderRadius: theme.primaryRadius,
    padding: '10px',
  },
  dateSeparator: {
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '16px',
    color: theme.textColor,
  },

  cardLogoWrapperResponsive: {
    width: '200px',
    marginBottom: '32px',
  },

  durationTitleResponsive: {
    marginBottom: '8px',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '16px',
    color: theme.textColor,
  },

  [MediaBreakPoints.Tablet]: {
    input: {
      height: '40px',
      lineHeight: '15px',
      fontSize: '14px',
    },
  },
}))
