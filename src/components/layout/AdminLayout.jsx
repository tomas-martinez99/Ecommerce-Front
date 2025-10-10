import React, { Children } from 'react'
import PropTypes from 'prop-types'
import LeftNavbar from '../header/LeftNavbar'

const AdminLayout = ({children}) => {
  return (
    <div>
        <LeftNavbar />
            {children}


    </div>
  )
}

AdminLayout.propTypes = {}

export default AdminLayout