import { createUseStyles } from 'react-jss'
import { AppTheme } from 'src/modules/shared/types/style.types'

export const donationsUseStyles = createUseStyles((theme: AppTheme) => ({
  donationsWrapper: {
    width: '100%',
  },

  donationItemWrapper: {
    padding: '12px 20px',
    background: '#1d2330',
    border: `1px solid ${theme.inputBackground}`,
    color: theme.textColor,
    '&:first-child': {
      borderTop: ({ isUiSeparated }: { isUiSeparated: boolean }) =>
        isUiSeparated ? `1px solid ${theme.inputBackground}` : 0,
      borderRadius: ({ isUiSeparated }: { isUiSeparated: boolean }) =>
        isUiSeparated ? `${theme.primaryRadius} ${theme.primaryRadius} 0 0` : 0,
    },

    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:last-child': {
      borderRadius: `0 0 ${theme.primaryRadius} ${theme.primaryRadius}`,
    },
  },

  nickname: {
    fontSize: '1rem',
    lineHeight: '20px',
  },
  createdDate: {
    color: theme.textDarker,
    fontWeight: '500',
    fontSize: '1rem',
    lineHeight: '1.25rem',
  },
  priceWrapper: {
    display: 'flex',
    marginBottom: '6px',
    marginLeft: '10px',
    alignItems: 'center',
  },
  amount: {
    marginLeft: '12px',
    fontSize: '24px',
    lineHeight: '29px',
    fontWeight: 600,
  },

  notes: {
    color: theme.textDarker,
    fontSize: '14px',
    lineHeight: '17px',
    maxWidth: '51.278125rem',
    fontWeight: 400,
  },
}))
