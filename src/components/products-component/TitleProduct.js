import React from 'react'
import { Link } from 'react-router-dom'
import { 
    Navbar,
    Nav,
    NavItem,
    NavbarBrand,
    Container,
    ListGroup, 
    ListGroupItem
 } from "reactstrap";

 export const TitleProduct = () => {
    return (
        <>
            <Navbar color='primary' dark>
                <Container style={{display: "flex"}}>
                    <NavbarBrand className='col-sm-4' href='/products'>Products</NavbarBrand>
                    <Nav style={{"marginLeft": "auto"}}>
                        <NavItem>
                            <Link className='btn btn-light' to={'/products/add'}>Create</Link>
                        </NavItem> 
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
