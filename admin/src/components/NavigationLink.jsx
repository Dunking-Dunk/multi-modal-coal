import React from 'react'
import { Link, useLocation } from 'react-router-dom'


const NavigationLink = ({ children, href, className }) => {
    const { pathname } = useLocation()
    const isActive = pathname === href

    return (
        <Link to={href} className={`${className} text-md font-medium transition-colors hover:text-primary ${isActive ? 'text-[#F94C10]' : 'text-primary'}`}>
            {children}
        </Link>
    )
}

export default NavigationLink