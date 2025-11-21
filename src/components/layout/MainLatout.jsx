import React from 'react'
import PropTypes from 'prop-types'
import Header from '../header/Header'
import FooterComponent from '../footer/FooterComponent'

const MainLatout = ({ children }) => {
  return (
    <>
      <div className="app-root">
        <Header />
        <main  className="no-transform">
          {children}
        </main>

      </div>
      <div  className="no-transform">
        <FooterComponent />
      </div>
    </>


  )
}

MainLatout.propTypes = {}

export default MainLatout