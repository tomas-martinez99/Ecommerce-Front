import React from 'react'
import PropTypes from 'prop-types'
import Header from '../header/Header'
import Footer from '../footer/Footer'

const MainLatout = ({children}) => {
  return (
    <div> 
        <Header />
        {children}
        <Footer />
    </div>

        
  )
}

MainLatout.propTypes = {}

export default MainLatout