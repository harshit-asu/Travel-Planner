import React from 'react'
import {
  MDBNavbarItem,
  MDBNavbarLink,
  MDBInputGroup,
  MDBInput,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';

const NavbarSearch = props => {
  return (
    <div>
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
  </div>
  )
}

NavbarSearch.propTypes = {}

export default NavbarSearch