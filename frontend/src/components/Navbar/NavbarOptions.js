import React from 'react'
import PropTypes from 'prop-types'
import {
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarNav
} from 'mdb-react-ui-kit';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const NavbarOptions = props => {

  let navigate = useNavigate();

  return (
    <div className='navbar-options'>
      <MDBNavbarNav className="me-4 mb-2 mb-lg-0 d-flex justify-content-around">
        <MDBNavbarItem>
          <MDBNavbarLink onClick={() => navigate('/')} className='navbar-link-custom'>
            Home
          </MDBNavbarLink>
        </MDBNavbarItem>
        <MDBNavbarItem>
          <MDBNavbarLink onClick={() => navigate('/about')}  className='navbar-link-custom'>About</MDBNavbarLink>
        </MDBNavbarItem>
        <MDBNavbarItem>
          <MDBNavbarLink onClick={() => navigate('/contact')} className='navbar-link-custom'>Contact</MDBNavbarLink>
        </MDBNavbarItem>
      </MDBNavbarNav>
    </div>
  );
}

NavbarOptions.propTypes = {}

export default NavbarOptions