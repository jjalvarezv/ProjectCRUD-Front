import React, { useState, useEffect } from 'react'
import { EditProductForm } from './EditProductForm'
import { useParams } from 'react-router-dom';
import { endpoints } from '../../repositories/endpoints';


export const EditProduct = () => {

  const [productInfo, setProductInfo] = useState();
  const {id} = useParams();

  const GetProductInfo = async() => {
    const url = `${endpoints.getProduct}${id}`;
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
        setProductInfo(userInfo);
      } catch (error) {
        console.log(error)
      }
      
    } 
  }

  useEffect(() => {
    GetProductInfo()
  }, [])

  return (
    productInfo ? <EditProductForm productInfo = { productInfo } id = {id}/> : <div>Loading ...</div>
  )
}
