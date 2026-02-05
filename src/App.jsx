
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/componetsHome/home/Home'
import ProductList from './components/componentsProducts/productList/ProductList'
import MainLatout from './components/layout/MainLatout'
import ProviderList from './components/componentsSistem/componetsProvider/provider/ProviderList'
import AdminLayout from './components/layout/AdminLayout'
import ProductListAdmin from './components/componentsSistem/componetnsProductsAdmin/ProductListAdmin/ProductListAdmin'
import BrandList from './components/componentsSistem/componentsBrand/brandList/BrandList'
import ProductGroupList from './components/componentsSistem/componentsProductGroup/productGroupList/ProductGroupList'
import Cart from './components/componentsCart/cart/Cart'
import OrderList from './components/componentsSistem/componentsOrder/orderList/OrderList'
import Settings from './components/componentsSistem/componentsSettings/settings/Settings'
import PromotionList from './components/componentsSistem/componentsPromotions/promotionsList/PromotionList'



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

          <Route path="/cart" element={
          <MainLatout>
            <Cart />
          </MainLatout>} />

        <Route path="/providerList" element={
          <AdminLayout>
            <ProviderList/>
          </AdminLayout>} />

          <Route path="/productListAdmin" element={
          <AdminLayout>
            <ProductListAdmin/>
          </AdminLayout>} />

          <Route path="/brandList" element={
          <AdminLayout>
            <BrandList/>
          </AdminLayout>} />

           <Route path="/productGropList" element={
          <AdminLayout>
            <ProductGroupList/>
          </AdminLayout>} />

          <Route path="/orderList" element={
          <AdminLayout>
            <OrderList/>
          </AdminLayout>} />

           <Route path="/promotionList" element={
          <AdminLayout>
            <PromotionList/>
          </AdminLayout>} />

           <Route path="/settings" element={
          <AdminLayout>
            <Settings/>
          </AdminLayout>} />
      </Routes>

    </BrowserRouter>
  )
}

export default App