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
import { Customer } from "../../models/Customer";

export const AddCustomer = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [success, setSuccess] = useState(Boolean);
  const [message, setMessage] = useState(false);

  const HandleForm = async (e) => {

    e.preventDefault();
    const requestBody = await Customer(
      firstName,
      lastName,
      company,
      phone,
      pass
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

    const url = `${endpoints.createCustomer}`;
    return await fetch(url, requestData);
  }

  return (
    <>
      <h2>Add Customer</h2>
      <Form onSubmit={HandleForm}>
        <FormGroup>
          <Label for='txtFirstName'>FirstName <span style={{"color": "red"}}>*</span> </Label>
          <Input id='txtFirstName' type='text' placeholder='Type your FirstName' style={{"marginBottom": "1rem"}} onChange={e => setFirstName(e.target.value)} required/>
          <Label for='txtLastName'>LastName <span style={{"color": "red"}}>*</span> </Label>
          <Input id='txtLastName' type='text' placeholder='Type your LastName' style={{"marginBottom": "1rem"}} onChange={e => setLastName(e.target.value)} required/>
          <Label for='txtCompany'>Company <span style={{"color": "red"}}>*</span> </Label>
          <Input id='txtCompany' type='text' placeholder='Type your Company' style={{"marginBottom": "1rem"}} onChange={e => setCompany(e.target.value)} required/>
          <Label for='txtPhone'>Phone number <span style={{"color": "red"}}>*</span> </Label>
          <Input id='txtPhone' type='int' placeholder='Type your Phone' style={{"marginBottom": "1rem"}} onChange={e => setPhone(e.target.value)} required/>
          <Label for='txtPass'>Password <span style={{"color": "red"}}>*</span> </Label>
          <Input id='txtPass' type='password' placeholder='Type a Password' style={{"marginBottom": "1rem"}} onChange={e => setPass(e.target.value)} required/>
        </FormGroup>
        {
          !success ? (
            <>
              <Button className="btn btn-secondary" type='submit'>Add Customer</Button> &nbsp;
              <Link to={"/customers"} className='btn btn-danger'>Cancel</Link>
            </>
          ) : (
            <>
              <Link to={"/customers"} className='btn btn-info'>Back</Link>
              <Alert className='mt-2' severity='success'>Customer created successfully</Alert>
            </>
          )
        }
        {
          message ? (
            <Alert className='mt-2 mb-2' severity='error'>Error creating the customer</Alert>
          ) : (<></>)
        }
      </Form>
    </>
  )
}
