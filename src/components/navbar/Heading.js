import axios from 'axios'
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  Container,
  Button,
} from 'reactstrap'
import { endpoints } from '../../repositories/endpoints'
import { Home } from '../Home'


export const Heading = ({ login }) => {

  const [logout, setLogout] = useState(false);

  if (logout) return <Home></Home>//<Navigate to={"/"}/>

  const Logout = async (e) => {
    const url = endpoints.deleteRefresh;
    try {
      const response = await axios.post(url, {}, { withCredentials: true });
      if (response.status === 204)
        setLogout(true);
      else 
        alert("Couldn't logout");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Navbar color="dark" dark>
      <Container style={{ display: 'flex' }}>
        <NavbarBrand className="col-sm-4" href="/">
          Adventure Database
        </NavbarBrand>
        {login ? (
          <Nav style={{ marginLeft: 'auto' }}>
            <NavItem style={{ marginLeft: '0.5rem' }}>
              <Link className="btn btn-primary" to={'/customers'}>
                Customers
              </Link>
            </NavItem>
            <NavItem style={{ marginLeft: '0.5rem' }}>
              <Link className="btn btn-primary" to={'/products'}>
                Products
              </Link>
            </NavItem>
            <NavItem style={{ marginLeft: '0.5rem' }}>
              <Link className="btn btn-primary" to={'/addresses'}>
                Addresses
              </Link>
            </NavItem>
            <NavItem style={{ marginLeft: '0.5rem' }}>
              <Button className="btn btn-primary" onClick={Logout}>
                Logout
              </Button>
            </NavItem>
          </Nav>
        ) : (
          <></>
        )}
      </Container>
    </Navbar>
  )
}
