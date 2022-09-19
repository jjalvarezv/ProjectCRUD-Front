import React from 'react'
import { Heading } from "../navbar/Heading";
import { ListAddress } from "./ListAddress";
import { TitleAddress } from "./TitleAddress";

export const HomeAddress = () => {
  return (
    <>
      <Heading></Heading>
      <TitleAddress></TitleAddress>
      <ListAddress></ListAddress>
    </>
  )
}
