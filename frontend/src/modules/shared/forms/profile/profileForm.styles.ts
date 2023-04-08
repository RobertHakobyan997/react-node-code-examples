import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../types/style.types'
import { MediaBreakPoints } from '../../constants/style.constants'
import { globalStyles } from 'src/styles/global.styles'

export const profileFormUseStyles = createUseStyles((theme: AppTheme) => ({
  formStyle: {
    ...globalStyles.form,
    width: '45rem',
    maxWidth: '100%',
  },

  wrapper: {
    backgroundColor: theme.modalBackground,
    borderRadius: theme.primaryRadius,
    border: `1px solid ${theme.inputStroke}`,
    width: '100%',
    margin: '1.25rem 0.9375rem',
    height: 'calc(var(--screen-size) - 6.4375rem)',
    overflowY: 'auto',
  },

  formContent: {
    width: '100%',
    height: 'calc(var(--screen-size) - 6.4375rem)',
  },

  createProfileWrapper: {
    height: 'auto',
    composes: '$wrapper',
    marginBottom: 0,
  },

  content: {
    margin: '1.5rem 0',
    padding: '0 1.25rem',
    maxWidth: '30rem',
    width: '100%',
  },

  header: {
    width: '100%',
    marginBottom: '32px',

    '& > span': {
      color: theme.textColor,
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: '1.5rem',
    },
  },
  fieldWrapper: {
    width: '100%',
    margin: '2rem 0',
  },
  submitWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    gap: '0 1.25rem',
    marginTop: '2rem',

    '& > div': {
      width: 'auto',
    },
  },

  [MediaBreakPoints.Tablet]: {
    createProfileWrapper: {
      height: 'calc(var(--screen-size) - 6.4375rem)',
    },

    header: {
      '& > span': {
        fontSize: '1.125rem',
        lineHeight: '1.375rem',
      },
    },

    submitWrapper: {
      justifyContent: 'center',
      '& > div': {
        width: '100%',
      },
    },
  },
}))
