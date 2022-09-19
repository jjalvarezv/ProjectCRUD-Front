import React, { useState, useEffect } from 'react'
import { EditFormAddress } from './EditForm'
import { useParams } from 'react-router-dom';
import { endpoints } from '../../repositories/endpoints';


export const EditAddress = () => {
  const [address, setAddressInfo] = useState();
  const {id} = useParams();

  const GetUserInfo = async() => {
    const url = `${endpoints.getAddress}${id}`;
    const token = localStorage.getItem("loggedAuthUser");
    const response = await fetch(url, 
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

    if (response.ok) {
      try {
        const { data } = await response.json()
        const [ userInfo ] = data; 
        setAddressInfo(userInfo);
      } catch (error) {
        console.log(error)
      }
      
    } 
  }

  useEffect(() => {
    GetUserInfo()
  }, [])
  
  return (
    address ? <EditFormAddress userInfo = { address } id = {id}/> : <div>Loading ...</div>
  )
}
