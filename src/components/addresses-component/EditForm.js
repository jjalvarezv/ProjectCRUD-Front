import React, { useState, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { endpoints } from '../../repositories/endpoints'
import { Alert } from '@mui/material'
import { Address } from '../../models/Address'

export const EditFormAddress = ({ userInfo, id }) => {
  const [success, setSuccess] = useState(Boolean)
  const [message, setMessage] = useState(false)

  const initialAddress = {
    addressLine1: userInfo.addressLine1,
    addressLine2: userInfo.addressLine2,
    city: userInfo.city,
    stateProvince: userInfo.stateProvince,
    countryRegion: userInfo.countryRegion,
    postalCode: userInfo.postalCode,
  }

  const formReducer = (curVals, newVals) => {
    return { ...curVals, ...newVals }
  }

  const [formValues, setFormValues] = useReducer(formReducer, initialAddress)

  const {
    addressLine1,
    addressLine2,
    city,
    stateProvince,
    countryRegion,
    postalCode,
  } = formValues

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormValues({ [name]: value })
  }

  const HandleForm = async (e) => {
    e.preventDefault()
    const requestBody = Address(
      addressLine1,
      addressLine2,
      city,
      stateProvince,
      countryRegion,
      postalCode,
    )
    const response = await SendCreateRequest(requestBody)
    if (response.ok) setSuccess(true)
    else {
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

    const url = `${endpoints.updateAddress}${id}`
    return await fetch(url, requestData)
  }

  return (
    <>
      <h2>Edit Address</h2>
      <Form onSubmit={HandleForm}>
        <FormGroup>
          <Label for="txtLine1">
            Address line 1 <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="text"
            placeholder="Type address line 1"
            style={{ marginBottom: '1rem' }}
            defaultValue = {addressLine1}
            name="addressLine1"
            onChange={handleFormChange}
            required
          ></Input>
          <Label for="txtLine2">Address line 2 </Label>
          <Input
            type="text"
            placeholder="Type address line 2"
            style={{ marginBottom: '1rem' }}
            defaultValue = {addressLine2}
            name="addressLine2"
            onChange={handleFormChange}
          ></Input>
          <Label for="txtCity">
            City <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="text"
            placeholder="Type city"
            style={{ marginBottom: '1rem' }}
            defaultValue = {city}
            name="city"
            onChange={handleFormChange}
            required
          ></Input>
          <Label for="txtProvince">
            State province <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="text"
            placeholder="Type state province"
            style={{ marginBottom: '1rem' }}
            defaultValue = {stateProvince}
            name="stateProvince"
            onChange={handleFormChange}
            required
          ></Input>
          <Label for="txtCountry">
            Country <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="text"
            placeholder="Type the country"
            style={{ marginBottom: '1rem' }}
            defaultValue = {countryRegion}
            name="countryRegion"
            onChange={handleFormChange}
            required
          ></Input>
          <Label for="txtPostal">
            Postal code <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            id="txtPostal"
            type="text"
            placeholder="Type the postal code"
            style={{ marginBottom: '1rem' }}
            defaultValue = {postalCode}
            name="postalCode"
            onChange={handleFormChange}
            required
          ></Input>
        </FormGroup>
        {!success ? (
          <>
            <Button className="btn btn-secondary" type="submit">
              Edit Address
            </Button>
            &nbsp;
            <Link to={'/addresses'} className="btn btn-danger">
              Cancel
            </Link>
          </>
        ) : (
          <>
            <Link to={'/addresses'} className="btn btn-info">
              Back
            </Link>
            <Alert className="mt-2" severity="success">
              Address edited successfully
            </Alert>
          </>
        )}
        {message ? (
          <Alert className="mt-2 mb-2" severity="error">
            Error edited the address
          </Alert>
        ) : (
          <></>
        )}
      </Form>
    </>
  )
}
