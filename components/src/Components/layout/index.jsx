import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarCom from '../sidebar'

const Layout = () => {
    return (
        <div className='grid-1'>
            <SidebarCom />
            <Outlet />

        </div>
    )
}

export default Layout