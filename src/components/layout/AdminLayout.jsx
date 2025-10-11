import React, { Children } from 'react'
import PropTypes from 'prop-types'
import LeftNavbar from '../header/LeftNavbar'

const AdminLayout = ({children}) => {
  return (
    <div>
        <LeftNavbar />
        <div style={{ marginLeft: '100px' }}>
            {children}
        </div>


    </div>
  )
}

AdminLayout.propTypes = {}

export default AdminLayout