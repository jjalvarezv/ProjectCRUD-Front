import React, { useState, useEffect, useReducer } from 'react'
import bcrypt from 'bcryptjs'
import { Link, useParams } from 'react-router-dom'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { endpoints } from '../../repositories/endpoints'
import { Alert } from '@mui/material'

export const EditProductForm = ({ productInfo, id }) => {
  const [success, setSuccess] = useState(Boolean)
  const [message, setMessage] = useState(false)

  const initialProduct = {
    name: productInfo.name,
    productNumber: productInfo.productNumber,
    standardCost: productInfo.standardCost,
    listPrice: productInfo.listPrice,
    size: productInfo.size,
    weight: productInfo.weight,
    sellStartDate: productInfo.sellStartDate,
  }

  const formReducer = (curVals, newVals) => {
    return { ...curVals, ...newVals }
  }

  const [formValues, setFormValues] = useReducer(formReducer, initialProduct)

  const {
    name,
    productNumber,
    standardCost,
    listPrice,
    size,
    weight,
    sellStartDate,
  } = formValues

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormValues({ [name]: value })
  }

  const HandleForm = async (e) => {
    e.preventDefault()
    const requestBody = {
      name: name,
      productNumber: productNumber,
      standardCost: standardCost,
      listPrice: listPrice,
      size: size,
      weight: weight,
      sellStartDate: sellStartDate,
    }
    const response = await SendCreateRequest(requestBody)

    if (response.ok) {
      setSuccess(true)
    } else {
      setSuccess(false)
      setMessage(true)
    }
  }

  const SendCreateRequest = async (requestBody) => {
    const token = localStorage.getItem('loggedAuthUser')
    const requestData = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    }

    const url = `${endpoints.updateProduct}${id}`
    return await fetch(url, requestData)
  }

  return (
    <>
      <h2>Edit Product</h2>
      <Form onSubmit={HandleForm}>
        <FormGroup>
          <Label for="txtName">
            Name: <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            id="txtName"
            type="text"
            style={{ marginBottom: '1rem' }}
            value={name}
            name="name"
            onChange={handleFormChange}
            required
          ></Input>

          <Label for="txtNumber">
            Product number: <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            id="txtNumber"
            type="text"
            placeholder="Type the product number"
            style={{ marginBottom: '1rem' }}
            value={productNumber}
            name="productNumber"
            onChange={handleFormChange}
            required
          ></Input>

          <Label for="txtCost">
            Product cost: <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            id="txtCost"
            type="number"
            step={0.1}
            placeholder="Type the product cost"
            style={{ marginBottom: '1rem' }}
            value={standardCost}
            name="standardCost"
            onChange={handleFormChange}
            required
          ></Input>

          <Label for="txtSellPrice">
            Selling price: <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            id="txtSellPrice"
            type="number"
            step={0.1}
            placeholder="Type the product selling price"
            style={{ marginBottom: '1rem' }}
            value={listPrice}
            name="listPrice"
            onChange={handleFormChange}
            required
          ></Input>

          <Label for="txtSize">
            Product size (cm): <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            id="txtSize"
            type="number"
            step={0.1}
            placeholder="Type the product size (cm)"
            style={{ marginBottom: '1rem' }}
            value={size}
            name="size"
            onChange={handleFormChange}
            required
          ></Input>

          <Label for="txtWeigth">
            Product weight (lb): <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            id="txtWeigth"
            type="number"
            step={0.1}
            placeholder="Type the product weight (lb)"
            style={{ marginBottom: '1rem' }}
            value={weight}
            name="weight"
            onChange={handleFormChange}
            required
          ></Input>

          <Label for="txtSellStartDate">
            Product selling start date <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            id="txtSellStartDate"
            type="date"
            placeholder="Enter the selling start date"
            style={{ marginBottom: '1rem' }}
            value={sellStartDate}
            name="sellStartDate"
            onChange={handleFormChange}
            required
          ></Input>

          {!success ? (
            <>
              <Button className="btn btn-primary" type="submit">
                Edit Product
              </Button>{' '}
              &nbsp;
              <Link to={'/products'} className="btn btn-danger">
                Cancel
              </Link>
            </>
          ) : (
            <>
              <Link to="/products" className="btn btn-info">
                Back
              </Link>
              <Alert className="mt-2" severity="success">
                Product edited successfully
              </Alert>
            </>
          )}
          {message ? (
            <Alert className="mt-2 mb-2" severity="error">
              Error editing the product
            </Alert>
          ) : (
            <></>
          )}
        </FormGroup>
      </Form>
    </>
  )
}
