import React from 'react'
import { Link } from 'react-router-dom'
import { 
    Navbar,
    Nav,
    NavItem,
    NavbarBrand,
    Container
 } from "reactstrap";

 export const TitleCustomer = () => {

    return (
        <>
            <Navbar color='primary' dark>
                <Container style={{display: "flex"}}>
                    <NavbarBrand className='col-sm-4' href='/customers'>Customers</NavbarBrand>
                    <Nav style={{"marginLeft": "auto"}}>
                        <NavItem>
                            <Link className='btn btn-light' to={'/customers/add'}>Create</Link>
                        </NavItem> 
                    </Nav>
                </Container>
            </Navbar>
        </>
        
    )
  }