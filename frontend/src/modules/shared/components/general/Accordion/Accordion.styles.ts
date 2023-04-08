import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../types/style.types'
import {
  AppThemeConstants,
  MediaBreakPoints,
} from '../../../constants/style.constants'

export const accordionUseStyles = createUseStyles((theme: AppTheme) => ({
  accordionItem: {
    border: `1px solid ${theme.borderDark}`,
    borderRadius: '8px',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
  },

  accordionTitleWrapper: {
    padding: '1.5rem 2rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: 'rgba(31, 36, 49, 0.5)',
    borderRadius: '8px',
  },

  addButton: {
    width: '32px',
    height: '32px',
    background: ({ isAddButtonActive }: { isAddButtonActive: boolean }) =>
      isAddButtonActive
        ? AppThemeConstants.primaryColor
        : AppThemeConstants.secondaryColor,
    border: 0,

    '&:hover': {
      background: ({ isAddButtonActive }: { isAddButtonActive: boolean }) =>
        isAddButtonActive
          ? AppThemeConstants.primaryHover
          : AppThemeConstants.secondaryColor,
    },
  },

  accordionTitle: {
    fontWeight: '700',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#FDFDFD',
    marginLeft: '20px',
  },

  accordionContent: {
    backgroundColor: '#141720',
    padding: '20px 14px ',
    borderRadius: theme.primaryRadius,
    display: 'grid',
    maxHeight: '1052px',
    overflowY: 'auto',
    overflowX: 'hidden',
    gridTemplateColumns: 'repeat(3, 1fr)',
  },

  '@supports (gap: 12px)': {
    accordionContent: {
      gap: '12px',
    },
  },

  '@supports not (gap: 12px)': {
    accordionContent: {
      '& > div': {
        margin: '0 12px 12px 0',
      },
    },
  },

  [MediaBreakPoints.Tablet]: {
    accordionContent: {
      gridTemplateColumns: '100%',
      padding: '20px 9.5px',
      justifyItems: 'center',
    },
  },
}))
