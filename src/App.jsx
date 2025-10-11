
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/componetsHome/home/Home'
import ProductList from './components/componentsProducts/productList/ProductList'
import MainLatout from './components/layout/MainLatout'
import ProviderList from './components/componentsSistem/componetsProvider/provider/ProviderList'
import AdminLayout from './components/layout/AdminLayout'
import ProductListAdmin from './components/componentsSistem/componetnsProductsAdmin/ProductListAdmin/ProductListAdmin'



function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <MainLatout>
            <Home />
          </MainLatout>
        } />

        <Route path="/productList" element={
          <MainLatout>
            <ProductList />
          </MainLatout>} />

        <Route path="/providerList" element={
          <AdminLayout>
            <ProviderList/>
          </AdminLayout>} />

          <Route path="/productListAdmin" element={
          <AdminLayout>
            <ProductListAdmin/>
          </AdminLayout>} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
