import { AppThemeConstants } from 'src/modules/shared/constants/style.constants'

export function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <path
        d="M9.20717 3.92969H2.79311C2.60073 3.92969 2.4933 4.13281 2.61244 4.27148L5.81948 7.99023C5.91127 8.09668 6.08803 8.09668 6.1808 7.99023L9.38784 4.27148C9.50698 4.13281 9.39955 3.92969 9.20717 3.92969Z"
        fill="#FDFDFD"
      />
    </svg>
  )
}

export function ArrowIconUp() {
  return (
    <div style={{ transform: 'rotate(180deg)' }}>
      <ArrowIcon />
    </div>
  )
}

export function AccordionArrowIconDown({
  isDisabled,
}: {
  isDisabled: boolean
}) {
  return (
    <svg
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <path
        d="M9.00759 8.72956L15.0343 2.92956C15.9009 2.1029 15.3143 0.63623 14.1143 0.63623H2.06092C0.860923 0.63623 0.274256 2.1029 1.14092 2.92956L7.16759 8.72956C7.67426 9.2229 8.50092 9.2229 9.00759 8.72956Z"
        fill={isDisabled ? '#494949' : AppThemeConstants.textColor}
      />
    </svg>
  )
}

export function AccordionArrowIconUp({ isDisabled }: { isDisabled: boolean }) {
  return (
    <div style={{ transform: 'rotate(180deg)' }}>
      <AccordionArrowIconDown isDisabled={isDisabled} />
    </div>
  )
}

export function ArrowBack() {
  return (
    <svg
      style={{ display: 'block' }}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.4282 6.32115H2.97999L9.23356 0.892578C9.33356 0.805078 9.27285 0.642578 9.1407 0.642578H7.56035C7.4907 0.642578 7.42463 0.667578 7.37285 0.712221L0.624633 6.56758C0.562827 6.62115 0.513259 6.68739 0.479288 6.76179C0.445316 6.8362 0.427734 6.91704 0.427734 6.99883C0.427734 7.08062 0.445316 7.16146 0.479288 7.23587C0.513259 7.31027 0.562827 7.3765 0.624633 7.43008L7.41213 13.3211C7.43892 13.3444 7.47106 13.3569 7.50499 13.3569H9.13892C9.27106 13.3569 9.33177 13.1926 9.23178 13.1069L2.97999 7.67829H13.4282C13.5068 7.67829 13.5711 7.61401 13.5711 7.53544V6.46401C13.5711 6.38544 13.5068 6.32115 13.4282 6.32115Z"
        fill="#FDFDFD"
      />
    </svg>
  )
}

export function ArrowLeft({ isActive }: { isActive: boolean }) {
  return (
    <svg
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.83962 2.06646V1.03119C6.83962 0.941456 6.7365 0.891902 6.66685 0.946813L0.629351 5.66244C0.578054 5.70233 0.536546 5.75341 0.507994 5.81179C0.479442 5.87016 0.4646 5.93429 0.4646 5.99927C0.4646 6.06425 0.479442 6.12838 0.507994 6.18675C0.536546 6.24512 0.578054 6.29621 0.629351 6.3361L6.66685 11.0517C6.73783 11.1066 6.83962 11.0571 6.83962 10.9673V9.93208C6.83962 9.86646 6.80882 9.80351 6.75792 9.76333L1.93649 5.99994L6.75792 2.23521C6.80882 2.19503 6.83962 2.13208 6.83962 2.06646Z"
        fill={
          isActive ? AppThemeConstants.textColor : AppThemeConstants.textDarker
        }
      />
    </svg>
  )
}

export function ArrowRight({
  isActive,
  color = AppThemeConstants.textColor,
}: {
  isActive: boolean
  color?: string
}) {
  return (
    <svg
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.160379 2.06646V1.03119C0.160379 0.941456 0.263505 0.891902 0.333148 0.946813L6.37065 5.66244C6.42195 5.70233 6.46345 5.75341 6.49201 5.81179C6.52056 5.87016 6.5354 5.93429 6.5354 5.99927C6.5354 6.06425 6.52056 6.12838 6.49201 6.18675C6.46345 6.24512 6.42195 6.29621 6.37065 6.3361L0.333148 11.0517C0.262166 11.1066 0.160379 11.0571 0.160379 10.9673V9.93208C0.160379 9.86646 0.191183 9.80351 0.242075 9.76333L5.06351 5.99994L0.242075 2.23521C0.191183 2.19503 0.160379 2.13208 0.160379 2.06646Z"
        fill={isActive ? color : AppThemeConstants.textDarker}
      />
    </svg>
  )
}
