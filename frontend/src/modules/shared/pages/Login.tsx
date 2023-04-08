import { AuthLayout } from '../components/Layouts/AuthLayout/AuthLayout'

import { SocialMediaAuth } from '../components/SocialMediaAuth/SocialMediaAuthWrapper/SocialMediaAuth'

import AuthForm from '../forms/auth/Auth.form'

export const Login = () => {
  return (
    <AuthLayout>
      <SocialMediaAuth />
      <AuthForm />
    </AuthLayout>
  )
}
