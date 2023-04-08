import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../types/style.types'
import { AppThemeConstants } from '../../constants/style.constants'
import { MediaBreakPoints } from '../../constants/style.constants'

export const verificationUseStyles = createUseStyles((theme: AppTheme) => ({
  wrapper: {
    padding: '1.5rem 2rem',
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%2340698FFF' stroke-width='2' stroke-dasharray='10%2c 10' stroke-dashoffset='10' stroke-linecap='square'/%3e%3c/svg%3e")`,
    borderRadius: theme.primaryRadius,
    background: '#1B212C',
    boxShadow: '0px 6px 10px rgba(20, 20, 20, 0.15)',
  },
  verificationInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  header: {
    color: theme.textColor,
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: '24px',
  },
  description: {
    margin: '1.25rem 0',
    color: theme.textDarker,
    maxWidth: '50rem',
    fontSize: '1rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
  },
  sumsubWrapper: {
    height: '80vh',
    width: '43.75rem',
    maxWidth: '100%',
    background: AppThemeConstants.ticketColor,
    borderRadius: AppThemeConstants.primaryRadius,
    padding: '1.25rem',
    overflowY: 'auto',
  },
  statusBadge: {
    fontWeight: 400,
    fontSize: '16px',
    padding: '5px 10px',
    borderRadius: '8px',
  },
  waitingStatus: {
    background: 'rgba(255, 215, 98, 0.2)',
    color: '#FAAD14',
    padding: '5px 10px',
    borderRadius: '8px',
  },
  canceledStatus: {
    background: 'rgba(91, 18, 31, 0.3)',
    color: '#FF4D4F',
  },
  confirmedStatus: {
    background: 'rgba(170, 255, 118, 0.2)',
    color: '#75C84C',
  },
  titleWrapper: {
    flexDirection: 'row',
  },
  buttonWrapper: {
    width: 'max-content',
    fontSize: '1rem',
  },

  [MediaBreakPoints.Tablet]: {
    titleWrapper: {
      flexDirection: 'column',
      flexFlow: 'column wrap',
      alignItems: 'flex-start',
    },
    waitingStatus: {
      marginTop: '15px',
    },
    verificationInfo: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    header: {
      marginBottom: '0.9375rem',
    },

    numberInput: {
      maxWidth: '36px',
      width: '100%',
      height: '0',
      maxHeight: '40px',
    },
    buttonWrapper: {
      width: '100%',
    },
  },
}))

export const sumsubStylesString = `
:root {
 --primary-color: ${AppThemeConstants.textColor};
 --red-color: ${AppThemeConstants.dangerColor};
 --orange-color: ${AppThemeConstants.orangeColor};
 --success-color: ${AppThemeConstants.successColor};
}

body, .document-status, .document-status .content  {
  background: transparent !important;
}
.step .line {
  background-color: ${AppThemeConstants.inputStroke}; 
}

.step .bullet {
  background-color: ${AppThemeConstants.inputBackground};
  border: 1px solid ${AppThemeConstants.inputStroke}
}


input, select, .country-selector .list, .drag-drop, .mobile-button {
  background: ${AppThemeConstants.inputBackground} !important;
  box-shadow: none;
}

.error-message-popup .popup {
  background: ${AppThemeConstants.inputBackground} !important;
}

.step.active .line, .step.success .line, .checkbox input:checked ~ .checkmark {
  background: ${AppThemeConstants.primaryColor};
}

.radio-item .checkmark::after {
  background: ${AppThemeConstants.primaryColor};
}

.checkbox .checkmark, .radio-item .checkmark {
  border: 2px solid ${AppThemeConstants.inputStroke} !important;
}

.radio-item input:checked ~ .checkmark  {
  border: 2px solid ${AppThemeConstants.primaryColor} !important;
}

.checkbox .checkmark:after {
  left: 3px;
  top: -1px;
  width: 3px;
  height: 8px;
} 

.error-message.warn {
  background-color: ${AppThemeConstants.calendulaGold};
}

.step.active .bullet::before, .steps.mobile .step.pending {
  background: ${AppThemeConstants.primaryColor} !important;
}


.error-message.warn .message-content p, .message-title {
  color: rgba(0, 0, 0, 0.85) !important;
}

.step.active .bullet {
  box-shadow: none;
  border: 1px solid ${AppThemeConstants.primaryColor} !important;
  background: ${AppThemeConstants.inputBackground} !important;
}

.radio-item input:disabled ~ .checkmark {
  background: ${AppThemeConstants.inputBackground};
  border-color: ${AppThemeConstants.inputStroke};
}


.radio-item input:disabled ~ .checkmark::after {
  background-color: ${AppThemeConstants.primaryColor};
}


.step.active.pending .bullet {
 border-color: ${AppThemeConstants.primaryColor};
}

.step.success .bullet {
  background-color: ${AppThemeConstants.primaryColor};
  border-color: ${AppThemeConstants.primaryColor};
}

.step.pending .line {
  background-color: ${AppThemeConstants.inputStroke};
}

.step.pending .bullet {
  background: ${AppThemeConstants.inputBackground} !important;
  border-color: ${AppThemeConstants.inputStroke};
}

.step.active.pending .bullet::before {
  background: ${AppThemeConstants.primaryColor};
}

.ident-step.process .bullet {
  border-color: ${AppThemeConstants.primaryColor};
}

.fa-circle-o-notch::before {
  color: ${AppThemeConstants.primaryColor};
}

.accent {
  color: ${AppThemeConstants.primaryColor}
}

.country-selector .list {
  border: 1px solid ${AppThemeConstants.inputStroke}
}

.content {
  background: ${AppThemeConstants.ticketColor};
}
 
.country-selector .list li.active, .country-selector .list li:hover {
  background: ${AppThemeConstants.inputSelectedBackground};
}

.country-selector .show-hide {
  color: ${AppThemeConstants.textColor};
}
 
button:hover:not(:disabled):not(.disabled):not(:active) {
  box-shadow: none
}
 
.upload-payment-item .upload-item {
  background: ${AppThemeConstants.inputBackground};
  box-shadow: none;
}

.loader-overlay, #loader, .spinner-container {
  background: transparent !important;
}

.loader-overlay .loader {
  margin-top: 200px;
}

#loader .round-icon, .round-icon {
  background-image: none;
  background: ${AppThemeConstants.primaryColor} !important;
}
  

.submit, .back {
  background-color: ${AppThemeConstants.primaryColor};
  background-image: none !important;
  color: ${AppThemeConstants.textColor};
  border-radius: ${AppThemeConstants.primaryRadius};
}

section .row li::marker {
  color: ${AppThemeConstants.textColor};
}


@media screen and (max-width: 480px) {

body {
  background: transparent !important;
 }
 
 section.content {
  margin-top: 40px !important;
 }
 
 #not-supported-msg {
  margin: 40px auto;
 }
}
`
