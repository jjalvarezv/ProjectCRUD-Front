import React, { useEffect, useState } from 'react'
import { endpoints } from '../../repositories/endpoints';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { Navigate } from 'react-router'

import axios from "axios";

export const LoginForm = () => {

    const [name, setName] = useState();
    const [navigate, setNavigate] = useState(false);
  
    if (navigate) return <Navigate to={"/"} />
  
    const GetAuthToken = async (e) => {
  
      e.preventDefault();
      const url = `${endpoints.getToken}`
  
      try {
  
        const response = await axios.post(url, {
          UserName: name,
        }, {withCredentials: true})
        if (response.status === 200) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
          setNavigate(true);
        }
  
      } catch (error) {
        console.log('Error generating jwt')
      }
    }
  
    return (
      <div style={{ margin: '0 auto', width: '30rem', marginTop: '3rem' }}>
        <h2>Login</h2>
        <Form onSubmit={GetAuthToken}>
          <FormGroup className="form-group">
            <Label>Name</Label>
            <Input
              type="text"
              className="form-group"
              placeholder="Type your name"
              style={{ marginBottom: '1rem' }}
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Button type="submit" className="btn btn-primary">
              Login
            </Button>
          </FormGroup>
        </Form>
      </div>
    )
}
