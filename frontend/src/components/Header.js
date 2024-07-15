import React, { useState } from 'react';
import {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBContainer,
    MDBIcon,
    MDBBtn,
    MDBCollapse,
    MDBNavbarBrand,
    MDBInput,
    MDBInputGroup
} from 'mdb-react-ui-kit';


const Header = () => {
    const [openNavColorThird, setOpenNavColorThird] = useState(false);

    return (
        <MDBNavbar expand='lg' dark style={{ backgroundColor: '#04b4bd' }} sticky>
            <MDBContainer fluid>
                <MDBNavbarBrand href='#'>
                    <div className='d-flex flex-row justify-content-center'>
                        <MDBIcon fas icon="umbrella-beach fa-2x me-3" style={{ color: 'white' }} />
                        <span className="h3 fw-bold mb-0">Travel Planner</span>
                    </div>
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    type='button'
                    data-target='#navbarColor02'
                    aria-controls='navbarColor02'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setOpenNavColorThird(!openNavColorThird)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse open={openNavColorThird} navbar className='flex justify-content-center'>
                    <MDBNavbarNav className='me-auto mb-lg-0'>
                        <MDBNavbarItem className='active'>
                            <MDBNavbarLink aria-current='page' href='#'>
                            Home
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='#'>Trips</MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='#'>Places</MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem className='me-5'>
                            <MDBNavbarLink href='#'>About</MDBNavbarLink>
                        </MDBNavbarItem>

                        <MDBNavbarItem >
                            <MDBNavbarLink href='#' className='me-5 mx-5 ms-5'>
                            <MDBInputGroup >
                                <MDBInput label='Search' labelStyle={{color: 'white'}} />
                                <MDBBtn rippleColor='dark' style={{backgroundColor: 'white'}}>
                                    <MDBIcon icon='search' color='black'/>
                                </MDBBtn>
                            </MDBInputGroup>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='#'>
                            <MDBIcon fas icon="user-circle fa-2x  ms-8" style={{ color: 'white' }} />
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default Header;