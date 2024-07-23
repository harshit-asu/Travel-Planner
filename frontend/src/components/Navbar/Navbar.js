import React from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarBrand,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import NavbarSearch from './NavbarSearch';
import NavbarOptions from './NavbarOptions';
import NavbarAuth from './NavbarAuth';
import NavbarProfile from './NavbarProfile';
import { useAuth } from '../../AuthProvider';
import { useNavigate } from 'react-router-dom';

const Navbar = props => {
  const { auth } = useAuth();
  let navigate = useNavigate();

  return (
    <MDBNavbar expand='lg' dark style={{ backgroundColor: '#04b4bd' }} sticky>
      <MDBContainer fluid className='d-flex mx-4 px-4 flex-column align-items-center'>
        <MDBRow className='w-100 d-flex justify-content-between'>
          <MDBCol md='4'>
            <MDBNavbarBrand onClick={() => {auth ? navigate('/dashboard') : navigate('/')}} style={{cursor: 'pointer'}}  >
              <div className='d-flex flex-row justify-content-end align-items-center'>
                <MDBIcon fas icon="umbrella-beach fa-2x me-3" style={{ color: 'white' }} />
                <span className="h3 fw-bold mb-0">Travel Planner</span>
              </div>
            </MDBNavbarBrand>
          </MDBCol>
          <MDBCol md='5' className='d-flex flex-row justify-content-center align-items-center'>
            {(!auth) ? <NavbarOptions /> : <NavbarSearch />}
          </MDBCol>
          <MDBCol md='3' className='d-flex flex-row justify-content-end align-items-center'>
            {(!auth) ? <NavbarAuth /> : <NavbarProfile /> }
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBNavbar>
  );
}

Navbar.propTypes = {}

export default Navbar