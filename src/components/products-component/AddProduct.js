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

export const AddProduct = () => {

  const [name, setName] = useState("");
  const [productNumber, setProductNumber] = useState("");
  const [size, setSize] = useState("");
  const [listPrice, setListPrice] = useState("");
  const [standardCost, setStandartCost] = useState("");
  const [weight, setWeight] = useState("");
  const [sellStartDate, setSellStartDate] = useState("");
  const [success, setSuccess] = useState(Boolean);
  const [message, setMessage] = useState(false);

  const HandleForm = async (e) => {
    e.preventDefault();
    const requestBody = {
      "name": name,
      "productNumber": productNumber,
      "standardCost": standardCost,
      "listPrice": listPrice,
      "size": size,
      "weight": weight,
      "sellStartDate": sellStartDate,
    }
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

    const url = `${endpoints.createProduct}`;
    return await fetch(url, requestData);
  }

  return (
    <>
      <h2>Add Product</h2>
      <Form onSubmit={HandleForm}>
        <FormGroup>
          <Label for='txtName'>Name: <span style={{"color": "red"}}>*</span></Label>
          <Input id='txtName' type='text' placeholder='Type the product name' style={{"marginBottom": "1rem"}} onChange = {e => setName(e.target.value)}></Input>
          <Label for='txtNumber'>Product number: <span style={{"color": "red"}}>*</span></Label>
          <Input id='txtNumber' type='text' placeholder='Type the product number' style={{"marginBottom": "1rem"}} onChange = {e => setProductNumber(e.target.value)}></Input>
          <Label for='txtCost'>Product cost: <span style={{"color": "red"}}>*</span></Label>
          <Input id='txtCost' type='number' step={0.1} placeholder='Type the product cost' style={{"marginBottom": "1rem"}} onChange = {e => setStandartCost(e.target.value)}></Input>
          <Label for='txtSellPrice'>Selling price: <span style={{"color": "red"}}>*</span></Label>
          <Input id='txtSellPrice' type='number' step={0.1} placeholder='Type the product selling price' style={{"marginBottom": "1rem"}} onChange = {e => setListPrice(e.target.value)}></Input>
          <Label for='txtSize'>Product size (cm): <span style={{"color": "red"}}>*</span></Label>
          <Input id='txtSize' type='number' step={0.1} placeholder='Type the product size (cm)' style={{"marginBottom": "1rem"}} onChange = {e => setSize(e.target.value)}></Input>
          <Label for='txtWeigth'>Product weight (lb): <span style={{"color": "red"}}>*</span></Label>
          <Input id='txtWeigth' type='number' step={0.1} placeholder='Type the product weight (lb)' style={{"marginBottom": "1rem"}} onChange = {e => setWeight(e.target.value)}></Input>
          <Label for='txtSellStartDate'>Product selling start date <span style={{"color": "red"}}>*</span></Label>
          <Input id='txtSellStartDate' type='date' placeholder='Enter the selling start date' style={{"marginBottom": "1rem"}} onChange = {e => setSellStartDate(e.target.value)}></Input>
        </FormGroup>
        {
          !success ? (
            <>
              <Button className="btn btn-secondary" type='submit'>Add Product</Button> &nbsp;
              <Link to={"/products"} className='btn btn-danger'>Cancel</Link>
            </>
          ) : (
            <>
              <Link to={"/products"} className='btn btn-info'>Back</Link>
              <Alert className='mt-2' severity='success'>Product created successfully</Alert>
            </>
          )
        }
        {
          message ? (
            <Alert className='mt-2 mb-2' severity='error'>Error creating the product</Alert>
          ) : (<></>)
        }
      </Form>
    </>
  )
}
