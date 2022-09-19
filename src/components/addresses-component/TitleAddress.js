import React from 'react'
import { Link } from 'react-router-dom'
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  Container
} from 'reactstrap'

export const TitleAddress = () => {
  return (
    <>
      <Navbar color="primary" dark>
        <Container style={{ display: 'flex' }}>
          <NavbarBrand className="col-sm-4" href="/addresses">
            Addresses
          </NavbarBrand>
          <Nav style={{ marginLeft: 'auto' }}>
            <NavItem>
              <Link className="btn btn-light" to={'/addresses/add'}>
                Create
              </Link>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}
