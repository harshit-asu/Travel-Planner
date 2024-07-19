import PropTypes from 'prop-types'
import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBContainer,
  MDBIcon,
  MDBBtn,
  MDBNavbarBrand,
  MDBInput,
  MDBInputGroup,
  MDBRow,
  MDBCol,
  MDBDropdown, 
  MDBDropdownMenu, 
  MDBDropdownToggle, 
  MDBDropdownItem
} from 'mdb-react-ui-kit';

const Navbar = props => {
  return (
    <MDBNavbar expand='lg' dark style={{ backgroundColor: '#04b4bd' }} sticky>
      <MDBContainer fluid className='d-flex flex-column align-items-center'>
        <MDBRow className='w-100 d-flex justify-content-between'>
          <MDBCol md='4'>
            <MDBNavbarBrand href='#'>
              <div className='d-flex flex-row justify-content-center align-items-center'>
                <MDBIcon fas icon="umbrella-beach fa-2x me-3" style={{ color: 'white' }} />
                <span className="h3 fw-bold mb-0">Travel Planner</span>
              </div>
            </MDBNavbarBrand>
          </MDBCol>
          <MDBCol md='4' className='d-flex flex-row justify-content-center align-items-center'>
            <MDBNavbarItem >
              <MDBNavbarLink href='#' className='me-5 ms-5'>
                <MDBInputGroup  style={{ borderRadius: '25px', overflow: 'hidden',border:'2px solid white'}}>
                  <MDBInput label='Explore destinations' labelStyle={{ color: 'white' }} />
                  <MDBBtn  style={{ backgroundColor: 'white' }}>
                    <MDBIcon icon='search' color='black' />
                  </MDBBtn>
                </MDBInputGroup>
              </MDBNavbarLink>
            </MDBNavbarItem >
          </MDBCol>
          <MDBCol md='4' className='d-flex flex-row justify-content-end align-items-center'>
            <MDBRow className='w-100 mx-0'>
              <MDBCol md='7' className=' d-flex flex-row justify-content-end align-items-center '>
                <MDBNavbarItem>
                  <MDBNavbarLink href='#'>
                    <MDBIcon fas icon="bell fa-1.5x  ms-8" style={{ color: 'white' }} />
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </MDBCol>
              <MDBCol md='5' className='d-flex flex-row justify-content-start align-items-center'>
                <MDBNavbarItem>
                  <MDBNavbarLink href='#'>
                    <MDBDropdown>
                      <MDBDropdownToggle className='dropdown-custom'>
                          <span className="fw-bold mt-0 me-2 " style={{ color: 'white', paddingBottom: ' 10px' }}>Swathi Anaji</span>
                          <MDBIcon fas icon="chevron-circle-down fa-1.5x  ms-8 " style={{ color: 'white' }} />
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBDropdownItem link>My Profile</MDBDropdownItem>
                        <MDBDropdownItem link>My Trips</MDBDropdownItem>
                        <MDBDropdownItem link>Logout</MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBNavbar>
  );
}

Navbar.propTypes = {}

export default Navbar