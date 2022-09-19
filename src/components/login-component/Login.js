import React from 'react'
import { Heading } from '../navbar/Heading'
import { LoginForm } from './LoginForm'

export const Login = () => {

  return (
    <>
      <Heading login = {false}></Heading>
      <LoginForm></LoginForm>
    </>

  )
}
