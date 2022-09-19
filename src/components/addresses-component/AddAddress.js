import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {  
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import { endpoints } from '../../repositories/endpoints';
import { Alert } from '@mui/material';
import { Address } from "../../models/Address";


export const AddAddress = () => {

  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [success, setSuccess] = useState(Boolean);
  const [message, setMessage] = useState(false);

  const HandleForm = async (e) => {

    e.preventDefault();
    const requestBody = Address(
      addressLine1,
      addressLine2,
      city,
      province,
      country,
      postalCode
    )
    const response = await SendCreateRequest(requestBody);
    if (response.ok) {
      setSuccess(true);
    } else {
      setSuccess(false);
      setMessage(true);
    }
  }

  const SendCreateRequest = async(requestBody) => {
    const token = localStorage.getItem("loggedAuthUser");
    const requestData = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    }

    const url = `${endpoints.createAddress}`;
    return await fetch(url, requestData);
  }
  
  return (
    <>
      <h2>Add Address</h2>
      <Form onSubmit={HandleForm}>
        <FormGroup>
          <Label for='txtLine1'>Address line 1 <span style={{"color": "red"}}>*</span></Label>
          <Input id='txtLine1' type='text' placeholder='Type address line 1' style={{"marginBottom": "1rem"}} onChange={e => setAddressLine1(e.target.value)} required></Input>
          <Label for='txtLine2'>Address line 2 </Label>
          <Input id='txtLine2' type='text' placeholder='Type address line 2' style={{"marginBottom": "1rem"}} onChange={e => setAddressLine2(e.target.value)}></Input>
          <Label for='txtCity'>City <span style={{"color": "red"}}>*</span></Label>
          <Input id='txtCity' type='text' placeholder='Type city' style={{"marginBottom": "1rem"}} onChange={e => setCity(e.target.value)} required></Input>
          <Label for='txtProvince'>State province <span style={{"color": "red"}}>*</span></Label>
          <Input id='txtProvince' type='text' placeholder='Type state province' style={{"marginBottom": "1rem"}} onChange={e => setProvince(e.target.value)} required></Input>
          <Label for='txtCountry'>Country <span style={{"color": "red"}}>*</span></Label>
          <Input id='txtCountry' type='text' placeholder='Type the country' style={{"marginBottom": "1rem"}} onChange={e => setCountry(e.target.value)} required></Input>
          <Label for='txtPostal'>Postal code <span style={{"color": "red"}}>*</span></Label>
          <Input id='txtPostal' type='text' placeholder='Type the postal code' style={{"marginBottom": "1rem"}} onChange={e => setPostalCode(e.target.value)} required></Input>
        </FormGroup>
        {
          !success ? (
            <>
              <Button className="btn btn-secondary" type='submit'>Add Address</Button> &nbsp;
              <Link to={"/addresses"} className='btn btn-danger'>Cancel</Link>
            </>
          ) : (
            <>
              <Link to={"/addresses"} className='btn btn-info'>Back</Link>
              <Alert className='mt-2' severity='success'>Address created successfully</Alert>
            </>
          )
        }
        {
          message ? (
            <Alert className='mt-2 mb-2' severity='error'>Error creating the address</Alert>
          ) : (<></>)
        }
      </Form>
    </>
  )
}
