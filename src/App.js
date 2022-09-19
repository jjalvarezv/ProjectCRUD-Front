import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './components/Home'
import { HomeCustomer } from './components/customers-component/HomeCustomer'
import { AddCustomer } from './components/customers-component/AddCustomer'
import { EditCustomer } from './components/customers-component/EditCustomer'
import { HomeProduct } from './components/products-component/HomeProduct'
import { AddProduct } from './components/products-component/AddProduct'
import { EditProduct } from './components/products-component/EditProduct'
import { HomeAddress } from './components/addresses-component/HomeAddress'
import { AddAddress } from './components/addresses-component/AddAddress'
import { EditAddress } from './components/addresses-component/EditAddress'
import { Login } from './components/login-component/Login'

function App() {
  return (
    <div style={{ maxWidth: '65rem', margin: '0 auto', marginTop: '3rem' }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path='login' element={<Login />} ></Route>
          <Route path="customers" element={<HomeCustomer />} />
          <Route path="customers/add" element={<AddCustomer />} />
          <Route path="customers/edit/:id" element={<EditCustomer />} />
          <Route path="products" element={<HomeProduct />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="addresses" element={<HomeAddress />} />
          <Route path="addresses/add" element={<AddAddress />} />
          <Route path="addresses/edit/:id" element={<EditAddress />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
