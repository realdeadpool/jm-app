import React from 'react'
import './NavLink.css'
import { NavLink as RouterNavLink } from 'react-router-dom'

export const NavLink = ({ href, label, setIsNavExpanded}) => (
  <RouterNavLink
    to={href}
    className="navi-link"
    activeclassname="active"
    onClick={() => setIsNavExpanded(false)}>
    {label}
  </RouterNavLink>
);