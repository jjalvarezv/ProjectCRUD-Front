import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Table } from 'reactstrap'
import { endpoints } from '../../repositories/endpoints'
import { EditProduct } from './EditProduct'

export const ListProduct = () => {

  const [products, setProducts] = useState([]);

  const GetProducts = async () => {
    
    try {
      const url = endpoints.getProducts;
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
        setProducts(data.data); // This funcion add all the data to products var
      } else {
        console.log('Error while making the request')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const ConfirmDelete = async (e) => {

    if (window.confirm("Delete product with name: " + e.currentTarget.name)){

      const response = await DeleteProduct(e.currentTarget.id)
      if (response.ok) {
        GetProducts();
      } else {
        alert("There was a problem");
      }
    } 
  }

  const DeleteProduct = async(id) => {
    const url = `${endpoints.deleteProduct}${id}`;
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
    GetProducts()
  }, [])

  return (
    <>
      <Table className="col-sm-12 mt-3" striped responsive>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Number</th>
            <th>Size</th>
            <th>Weight</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            products.length === 0 ? (
              <tr>
                <td>None data</td>
              </tr>
            ) : (
              products.map(product => (
              <tr key={product.productId} id={product.productId}>
                <td>{product.name}</td>
                <td>{product.productNumber}</td>
                <td>{product.size}</td>
                <td>{product.weight}</td>
                <td className='sm-3'>
                  <Link
                    className="btn btn-warning"
                    style={{ marginRight: '1rem' }}
                    to={`/products/edit/${product.productId}`}  >
                    Edit
                  </Link>
                  <Button onClick={ConfirmDelete} id={product.productId} name={product.firstName} color='danger'>Delete</Button>
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
