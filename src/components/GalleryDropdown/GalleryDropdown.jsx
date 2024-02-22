import React from 'react'
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle, MDBNavbarLink,
} from 'mdb-react-ui-kit'
import './GalleryDropdown.css'

export const GalleryDropdown = ({ items }) => (
  <MDBDropdown>
    <MDBDropdownToggle tag='a' className='gallery-dropdown-link'>
      Gallery
    </MDBDropdownToggle>
    <MDBDropdownMenu className="gallery-dropdown-menu">
      {items.map(item => (
        <MDBNavbarLink href={item.href} key={item.id} className='gallery-dropdown-item'>
          {item.label}
        </MDBNavbarLink>
      ))}
    </MDBDropdownMenu>
  </MDBDropdown>
);