import React from 'react'
import PropTypes from 'prop-types'
import Carousel from '../carousels/Carousels'
import PaymentMethods from '../paymentMethods/PaymentMethods'
import CarouselCards from '../carouselCards/CarouselCards'
import Benefits from '../benefits/Benefits'
import { useProducts } from '../../../hooks/products/useProducts'


const Home =() => {
  const { data, isLoading, isError, error, refetch } = useProducts()
   const products = Array.isArray(data)
    ? data
    : Array.isArray(data?.items)
    ? data.items
    : []
  return (
    <div>
     
      <Carousel/>
      <PaymentMethods/>
      <CarouselCards
        products={products}
        loading={isLoading}
        error={isError ? error : null}
        onRefresh={refetch}
      />
      <Benefits/>
      
    </div>
  )
}

Home.propTypes = {}

export default Home