import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { otpChangeUtil, otpPasteUtil } from '../../../utils/otp.utils'
import { otpInputUseStyles } from './OtpInput.styles'

interface OtpInputProps {
  inputsLength: number
  handleAction: (otp: string) => void
}

const getOtpInitialValue = (inputsLength: number) =>
  new Array(inputsLength).fill('')

export const OtpInput = ({ inputsLength, handleAction }: OtpInputProps) => {
  const { wrapper, numberInput } = otpInputUseStyles()
  const [otp, setOtp] = useState(getOtpInitialValue(inputsLength))
  const [activeOtpIndex, setActiveOtpIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange =
    (index: number) =>
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const newOtp = [...otp]
      const { normalizedInputValue, isNumber } = otpChangeUtil({
        inputValue: target.value,
      })

      if (isNumber) {
        newOtp[index] = normalizedInputValue
        setActiveOtpIndex((prevState) => {
          const nextIndex = prevState + 1
          const lastInputsIndex = inputsLength - 1
          return nextIndex <= lastInputsIndex ? nextIndex : lastInputsIndex
        })
        setOtp(newOtp)
      }
    }

  const handleKeyDown =
    (index: number) =>
    ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
      if (key === 'Backspace') {
        let newOtp = [...otp]
        if (!otp[index]) {
          setActiveOtpIndex((prev) => (index !== 0 ? prev - 1 : 0))
          return
        }

        newOtp[index] = ''
        setOtp(newOtp)
      }
    }

  const preventBlur = (index: number) => () => {
    if (index >= activeOtpIndex)
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus()
      }, 0)
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.stopPropagation()
    e.preventDefault()

    if (e.clipboardData) {
      const pasteData = e.clipboardData.getData('text').trim()
      const { newOtp, lastIndex } = otpPasteUtil({
        pasteData,
        otp,
        activeOtpIndex,
      })

      setOtp(newOtp)
      setActiveOtpIndex(lastIndex)
    }
  }

  const handleClick = (index: number) => (e: any) => {
    e.preventDefault()

    setActiveOtpIndex(index)
  }

  useEffect(() => {
    let otpTimeout: ReturnType<typeof setTimeout>
    let actionTimeout: ReturnType<typeof setTimeout>
    const otpString = otp.join('')
    if (inputRef.current) inputRef.current.focus()

    if (otpString.length === inputsLength) {
      otpTimeout = setTimeout(() => {
        setOtp(getOtpInitialValue(inputsLength))
        setActiveOtpIndex(0)
      }, 500)

      actionTimeout = setTimeout(() => {
        handleAction(otpString)
      }, 300)
    }

    return () => {
      clearTimeout(otpTimeout)
      clearTimeout(actionTimeout)
    }
  }, [activeOtpIndex, otp])

  return (
    <div className={wrapper}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={index === activeOtpIndex ? inputRef : null}
          onChange={handleChange(index)}
          onKeyDown={handleKeyDown(index)}
          onBlur={preventBlur(index)}
          onClick={handleClick(index)}
          onPaste={handlePaste}
          type="text"
          className={numberInput}
          disabled={index > activeOtpIndex}
          value={otp[index]}
        />
      ))}
    </div>
  )
}
