import { createUseStyles } from 'react-jss'

import { MediaBreakPoints } from '../../../constants/style.constants'

export const modalUseStyles = createUseStyles(() => ({
  modalWrapper: {
    height: 'var(--screen-size)',
    position: 'fixed',
    width: '100%',
    background: 'rgba(10, 11, 14, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '999',
    backdropFilter: 'blur(5px)',
  },

  modalContent: {
    position: 'relative',
    maxWidth: 'calc(100% - 1.875rem)',
    maxHeight: 'calc(var(--screen-size) - 2.5rem)',
    overflowY: 'auto',
    overflow: 'overlay',

    '&::-webkit-scrollbar': {
      width: '4px',
      scrollMargin: '20px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px transparent',
      scrollMargin: '20px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#38425C',
      outline: '1px solid #38425C',
      borderRadius: '8px',
      scrollMargin: '20px',
    },
  },

  [MediaBreakPoints.Tablet]: {
    modalWrapper: {
      height: 'var(--screen-size)',
    },
  },
}))
