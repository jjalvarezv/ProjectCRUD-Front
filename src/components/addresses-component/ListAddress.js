import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'reactstrap'
import { endpoints } from '../../repositories/endpoints'


export const ListAddress = () => {
  const [addresses, setAddresses] = useState([]);

  const GetAddresses = async () => {
    
    try {
      const url = endpoints.getAddresses;
      const token = localStorage.getItem("loggedAuthUser");
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });

      if (response.ok){
        const data = await response.json();
        setAddresses(data.data); // This funcion add all the data to addresses var
      } else {
        console.log('Error while making the request')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const ConfirmDelete = async (e) => {

    if (window.confirm("Delete address with name: " + e.currentTarget.name)){

      const response = await DeleteAddress(e.currentTarget.id)
      if (response.ok) {
        GetAddresses();
      } else {
        alert("There was a problem");
      }
    } 
  }

  const DeleteAddress = async(id) => {
    const url = `${endpoints.deleteAddress}${id}`;
    const token = localStorage.getItem("loggedAuthUser");
    return await fetch(url, 
      {
        method: "DELETE",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
  }

  useEffect(() => {
    GetAddresses()
  }, [])

  return (
    <>
      <Table className="col-sm-12 mt-3" striped responsive>
        <thead>
          <tr>
            <th className="col-md-2">Address line 1</th>
            <th className="col-md-1">Address line 2</th>
            <th className="col-md-2">City</th>
            <th className="col-md-2">Province</th>
            <th className="col-md-2">Country</th>
            <th className="col-md-3"></th>
          </tr> 
        </thead>
        <tbody>
          {
            addresses.length === 0 ? (
              <tr>
                <td>None data</td>
              </tr>
            ) : (
              addresses.map(address => (
              <tr key={address.addressId} id={address.addressId}>
                <td>{address.addressLine1}</td>
                <td>{address.addressLine2}</td>
                <td>{address.city}</td>
                <td>{address.stateProvince}</td>
                <td>{address.countryRegion}</td>
                <td className='sm-3'>
                  <Link
                    className="btn btn-warning"
                    style={{ marginRight: '1rem' }}
                    to={`/addresses/edit/${address.addressId}`}  >
                    Edit
                  </Link>
                  <Button onClick={ConfirmDelete} id={address.addressId} name={address.firstName} color='danger'>Delete</Button>
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
