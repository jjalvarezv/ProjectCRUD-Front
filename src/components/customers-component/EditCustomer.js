import React, { useState, useEffect } from 'react'
import { EditForm } from './EditForm'
import { useParams } from 'react-router-dom';
import { endpoints } from '../../repositories/endpoints';

export const EditCustomer = () => {

  const [user, setUserInfo] = useState();
  const {id} = useParams();

  const GetUserInfo = async() => {
    const url = `${endpoints.getCustomer}${id}`;
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
        setUserInfo(userInfo);
      } catch (error) {
        console.log(error)
      }
      
    } 
  }

  useEffect(() => {
    GetUserInfo()
  }, [])
  
  return (
    user ? <EditForm userInfo = { user } id = {id}/> : <div>Loading ...</div>
  )
}
