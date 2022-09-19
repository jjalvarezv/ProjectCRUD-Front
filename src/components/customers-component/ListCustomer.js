import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Button, Table } from 'reactstrap'
import { GetUserLogged } from '../../crosscutting/transversals'
import { endpoints } from '../../repositories/endpoints'

export const ListCustomer = () => {

  const [customers, setCustomers] = useState([]);
  const [login, setLogin] = useState();

  const GetCustomers = async () => {
    
    try {
      const url = endpoints.getCustomers;
      const response = await axios.get(url);

      if (response.status === 200){
        const { data } = await response.data;
        setCustomers(data); // This funcion add all the data to customers var
      } else {
        console.log('Error while making the request')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const ConfirmDelete = async (e) => {

    if (window.confirm("Delete customer with name: " + e.currentTarget.name)){

      const response = await DeleteCustomer(e.currentTarget.id)
      if (response.status === 204) {
        GetCustomers();
      } else {
        alert("There was a problem");
      }
    } 
  }

  const DeleteCustomer = async(id) => {
    const url = `${endpoints.deleteCustomer}${id}`;
    return await axios.delete(url);
  }

  useEffect(() => {
    setLogin(GetUserLogged())
    GetCustomers()
  }, [])

  if (login === false) return <Navigate to={"/login"}></Navigate>

  return (
    <>
      <Table className="col-sm-12 mt-3" striped responsive>
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Company</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            customers.length === 0 ? (
              <tr>
                <td>None data</td>
              </tr>
            ) : (
              customers.map(customer => (
              <tr key={customer.customerId} id={customer.customerId}>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.companyName}</td>
                <td>{customer.phone}</td>
                <td className='sm-3'>
                  <Link
                    className="btn btn-warning"
                    style={{ marginRight: '1rem' }}
                    to={`/customers/edit/${customer.customerId}`}  >
                    Edit
                  </Link>
                  <Button onClick={ConfirmDelete} id={customer.customerId} name={customer.firstName} color='danger'>Delete</Button>
                </td>
              </tr>
              ))
            )
          }
        </tbody>
      </Table>
    </>
  )
}
