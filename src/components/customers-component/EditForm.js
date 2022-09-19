import React, { useState, useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { endpoints } from '../../repositories/endpoints'
import { Alert } from '@mui/material'
import { Customer } from "../../models/Customer";


export const EditForm = ({ userInfo , id}) => {

  const [success, setSuccess] = useState(Boolean)
  const [message, setMessage] = useState(false)

  const initialUser = {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    companyName: userInfo.companyName,
    phone: userInfo.phone,
    passwordHash: userInfo.passwordHash,
  }

  const formReducer = (curVals, newVals) => {
    return { ...curVals, ...newVals }
  }

  const [formValues, setFormValues] = useReducer(formReducer, initialUser)

  const { firstName, lastName, companyName, phone, passwordHash } = formValues

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormValues({ [name]: value })
  }

  const HandleForm = async (e) => {

    e.preventDefault()
    const requestBody = await Customer(
      firstName,
      lastName,
      companyName,
      phone,
      passwordHash
    );
    const response = await SendCreateRequest(requestBody);
    if (response.ok)
      setSuccess(true);
    else {
      setSuccess(false);
      setMessage(true);
    }
  }

  const SendCreateRequest = async (requestBody) => {
    const token = localStorage.getItem("loggedAuthUser");
    const requestData = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody),
    }

    const url = `${endpoints.updateCustomer}${id}`
    return await fetch(url, requestData)
  }

  return (
    <>
      <h2>Edit Customer</h2>
      <Form onSubmit={HandleForm}>
        <FormGroup>
          <Label style={{ display: 'block' }} for="txtFirstName">
            FirstName <span style={{ color: 'red' }}>*</span>
            <Input
              type="text"
              placeholder="Type your FirstName"
              style={{ marginBottom: '1rem' }}
              defaultValue={formValues.firstName}
              name="firstName"
              onChange={handleFormChange}
              required
            />
          </Label>

          <Label style={{ display: 'block' }} for="txtLastName">
            LastName <span style={{ color: 'red' }}>*</span>
            <Input
              type="text"
              placeholder="Type your LastName"
              style={{ marginBottom: '1rem' }}
              value={lastName}
              name="lastName"
              onChange={handleFormChange}
              required
            />
          </Label>

          <Label style={{ display: 'block' }} for="txtCompany">
            Company <span style={{ color: 'red' }}>*</span>
            <Input
              type="text"
              placeholder="Type your Company"
              style={{ marginBottom: '1rem' }}
              value={companyName}
              name="companyName"
              onChange={handleFormChange}
              required
            />
          </Label>

          <Label style={{ display: 'block' }} for="txtPhone">
            Phone number <span style={{ color: 'red' }}>*</span>
            <Input
              type="int"
              placeholder="Type your Phone"
              style={{ marginBottom: '1rem' }}
              value={phone}
              name="phone"
              onChange={handleFormChange}
              required
            />
          </Label>

          <Label style={{ display: 'block' }} for="txtPass">
            Password <span style={{ color: 'red' }}>*</span>
            <Input
              type="text"
              placeholder="Type a Password"
              style={{ marginBottom: '1rem' }}
              value={passwordHash}
              name="passwordHash"
              onChange={handleFormChange}
              required
            />
          </Label>

          {!success ? (
            <>
              <Button className="btn btn-primary" type="submit">
                Edit Customer
              </Button>{' '}
              &nbsp;
              <Link to={'/customers'} className="btn btn-danger">
                Cancel
              </Link>
            </>
          ) : (
            <>
              <Link to="/customers" className="btn btn-info">
                Back
              </Link>
              <Alert className="mt-2" severity="success">
                Customer edited successfully
              </Alert>
            </>
          )}
          {message ? (
            <Alert className="mt-2 mb-2" severity="error">
              Error editing the customer
            </Alert>
          ) : (
            <></>
          )}
        </FormGroup>
      </Form>
    </>
  )
}
