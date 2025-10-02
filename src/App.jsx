
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/componetsHome/home/Home'
import ProductList from './components/componentsProducts/productList/ProductList'
import MainLatout from './components/layout/MainLatout'



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
      </Routes>

    </BrowserRouter>
  )
}

export default App
