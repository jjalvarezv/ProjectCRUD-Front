import React from 'react'
import { Heading } from "../navbar/Heading";
import { ListCustomer } from './ListCustomer';
import { TitleCustomer } from './TitleCustomer';

export const HomeCustomer = () => {

  return (
    <>
      <Heading></Heading>
      <TitleCustomer></TitleCustomer>
      <ListCustomer />
    </>
  )
}
