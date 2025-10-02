import React from 'react'
import PropTypes from 'prop-types'
import Carousel from '../carousels/Carousels'
import PaymentMethods from '../paymentMethods/PaymentMethods'
import CarouselCards from '../carouselCards/CarouselCards'
import Benefits from '../benefits/Benefits'

const PRODUCTS = [
  { id: 1, name: 'Kit de plastico smash negro', price: 100, img: '/src/productImg/1081.jpg' },
  { id: 2, name: 'Kit de plastico smash azul bitono', price: 200, img: '/src/productImg/1081A.jpg' },
  { id: 3, name: 'Kit transmision riffel CG150', price: 300, img: '/src/productImg/70766.jpg' },
  { id: 4, name: 'Bateria ritsuka', price: 400, img: '/src/productImg/bateria ritsuka.jpg' },
  { id: 5, name: 'Camara ritsuka', price: 500, img: '/src/productImg/camara ritsuka.jpg' },
  { id: 6, name: 'Funda asiento antideslisante para 110 Negra', price: 600, img: '/src/productImg/FV015.jpg' },
  { id: 7, name: 'Funda asiento antideslisante para 110 Azul', price: 600, img: '/src/productImg/FV015A.jpg' },
  { id: 8, name: 'Funda asiento antideslisante para 110 Blanco', price: 600, img: '/src/productImg/FV015B.jpg' },
];

const Home =() => {
  return (
    <div>
     
      <Carousel/>
      <PaymentMethods/>
      <CarouselCards products={PRODUCTS} />
      <Benefits/>
      
    </div>
  )
}

Home.propTypes = {}

export default Home