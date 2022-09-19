import React, { useEffect, useState } from 'react'
import { endpoints } from '../repositories/endpoints';
import { Heading } from "./navbar/Heading";
import axios from "axios";
import { Navigate } from 'react-router';

export const Home = () => {

  const [login, setLogin] = useState();

  const GetAuth = async () => {

    const url = `${endpoints.getUser}`;
    
    try {
      const response = await axios.get(url, { withCredentials: true });
      if (response.status !== 204) setLogin(true);
      else setLogin(false)
    } catch (error) {
      console.log("Error generating jwt")
    }
  }
  
  useEffect(() => {
    GetAuth();
  }, []) 

  if (login === false) return <Navigate to={"/login"}></Navigate>

  return (
    <div>
        <>
          <Heading login = {login}></Heading>
        </>
    </div>
  )
}
