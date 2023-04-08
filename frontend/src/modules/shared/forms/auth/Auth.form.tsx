import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { authSchema } from '../../schemas/auth.schema'
import { InputField } from '../../components/general/InputField/InputField'
import { Button } from '../../components/general/Button/Button'
import { ButtonVariants } from '../../components/general/Button/Button.types'
import { FormConstants } from '../../constants/message.constants'
import { authFormUseStyles } from './AuthForm.styles'
import { useMutation } from 'react-query'
import { loginEmail } from '../../services/login.services'
import { useNavigate } from 'react-router-dom'
import { SharedRouteConstants } from '../../constants/sharedRoute.constants'
import { saveStorageData } from '../../utils/localStorage.utils'
import { LocalStorage } from '../../constants/localStorage.constants'
import { useLoader } from '../../context/loader.context'
import { useModal } from '../../context/modal.context'
import { errorHandler } from '../../utils/error.utils'
import { ErrorResponse } from '../../types/error.types'

type AuthFormData = {
  email: string
}

const enum AuthFormFields {
  Email = 'email',
}

const AuthForm = () => {
  const { mutate, isLoading } = useMutation(loginEmail)
  const { provideModalSettings } = useModal()
  const navigate = useNavigate()

  const styles = authFormUseStyles()

  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<AuthFormData>({
    mode: 'onBlur',
    resolver: yupResolver(authSchema),
  })

  const emailHandleChange = (e: { target: HTMLInputElement }) =>
    setValue('email', e.target.value.toLowerCase())

  const onSubmit = ({ email }: { email: string }) => {
    mutate(
      { email: email.toLowerCase() },
      {
        onSuccess: () => {
          saveStorageData(LocalStorage.e, email)
          navigate(SharedRouteConstants.authorization())
        },

        onError: (error) => {
          const errorMessage = errorHandler(error as ErrorResponse)
          provideModalSettings({ content: errorMessage })
        },
      }
    )
  }

  useLoader(isLoading)

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <legend className={styles.legend}>{FormConstants.loginTitle}</legend>

      <InputField
        label="Эл. почта"
        register={register(AuthFormFields.Email, {
          onBlur: () => clearErrors(AuthFormFields.Email),
          onChange: emailHandleChange,
        })}
        placeholder={'Введите адрес электронной почты'}
        errorMessage={errors.email?.message}
      />

      <div style={{ margin: '2rem 0' }}>
        <Button type="submit" variant={ButtonVariants.Primary}>
          {FormConstants.loginSubmitTitle}
        </Button>
      </div>
    </form>
  )
}

export default AuthForm
