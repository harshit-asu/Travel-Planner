import React from 'react'
import {
  MDBNavbarItem,
  MDBNavbarLink,
  MDBInputGroup,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const NavbarSearch = props => {
  let navigate = useNavigate();
  return (
    <MDBRow className='d-flex w-100 flex-row flex-grow-0 align-items-center justify-content-center'>
      {/* <MDBCol md={6}>
        <MDBNavbarItem >
            <MDBNavbarLink href='#'>
            <MDBInputGroup >
                <MDBInput label='Explore destinations' labelStyle={{ color: 'white' }} />
                <MDBBtn  style={{ backgroundColor: 'white' }}>
                <MDBIcon icon='search' color='black' />
                </MDBBtn>
            </MDBInputGroup>
            </MDBNavbarLink>
        </MDBNavbarItem >
      </MDBCol> */}
      <MDBCol md={9} className='d-flex justify-content-around flex-wrap flex-grow-0 fw-bold'>
        <MDBNavbarItem >
            <MDBNavbarLink onClick={() => navigate('/dashboard')} className='navbar-link-custom'>
                Dashboard
            </MDBNavbarLink>
        </MDBNavbarItem >
        <MDBNavbarItem >
            <MDBNavbarLink onClick={() => navigate('/trips')} className='navbar-link-custom'>
                Trips
            </MDBNavbarLink>
        </MDBNavbarItem >
        <MDBNavbarItem >
            <MDBNavbarLink onClick={() => navigate('/invitations')} className='navbar-link-custom'>
                Invitations
            </MDBNavbarLink>
        </MDBNavbarItem >
      </MDBCol>
    </MDBRow>
  )
}

NavbarSearch.propTypes = {}

export default NavbarSearch