import React, { useState } from 'react';
import {
  MDBIcon,
  MDBCollapse,
  MDBNavbarToggler,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarLink,
} from 'mdb-react-ui-kit'
import './Navigation.css';
import { NavLink } from '../NavLinks/NavLink.jsx'
import  useCart   from '../UseCart/UseCart.jsx';

// Configuration for navbar links to make the component cleaner and more maintainable
const navLinks = [
  { id: 'street', label: 'Street', href: '/street' },
  { id: 'landscape', label: 'Landscape', href: '/landscapes' },
  { id: 'wildlife', label: 'Wildlife', href: '/wildlife' },
  { id: 'adventure', label: 'Adventure', href: '/adventure' },
  { id: 'printshop', label: 'Print Shop', href: '/printshop' },
];

const MainNavBar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const { cartItems }  = useCart();

  return (
    <MDBNavbar sticky expand='lg' className='navbar-custom'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>
          <img
            src='../../../public/images/jamilogo.png'
            alt='Logo'
            loading='lazy'
            height={'27'}
            width={'400'}
          />
        </MDBNavbarBrand>
        <MDBNavbarToggler
            aria-controls='navbarSupportedContent'
            aria-expanded={isNavExpanded}
            aria-label='Toggle navigation'
            onClick={() => setIsNavExpanded(!isNavExpanded)}>
            <MDBIcon fas icon='bars' size='lg'/>
        </MDBNavbarToggler>
        <MDBCollapse navbar open={isNavExpanded}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            {navLinks.map(link =>
              <NavLink key={link.id} {...link} />)}
          </MDBNavbarNav>
          <MDBNavbarNav className='social-nav'>
            {/*<MDBNavbarLink href='#' className='social-link'>*/}
            {/*  <MDBIcon fab icon='facebook' size='lg' />*/}
            {/*</MDBNavbarLink>*/}
            <MDBNavbarLink href='https://www.instagram.com/themarshpit/' className='social-link'>
              <MDBIcon fab icon='instagram' size='lg' />
            </MDBNavbarLink>
            {/*<MDBNavbarLink href='#' className='social-link'>*/}
            {/*  <MDBIcon fab icon='twitter' size='lg' />*/}
            {/*</MDBNavbarLink>*/}
            {/*<MDBNavbarLink href='#' className='social-link'>*/}
            {/*  <MDBIcon fab icon='tiktok' size='lg' />*/}
            {/*</MDBNavbarLink>*/}
            <MDBNavbarLink href="/cart" className='social-link'>
              <MDBIcon fas icon='shopping-cart' size='lg' />
              {cartItems.length > 0 && (
                <span className="cart-item-count">{cartItems.length}</span>
              )}
            </MDBNavbarLink>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default MainNavBar;


