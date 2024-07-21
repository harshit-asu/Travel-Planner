import React from "react";
import PropTypes from "prop-types";
import { MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";

const NavbarAuth = (props) => {
    return (
        <MDBRow className="me-2">
            <MDBCol md={6}> 
                <MDBBtn color="light" href="/login">Login</MDBBtn>
            </MDBCol>
            <MDBCol md={6}> 
                <MDBBtn color="light" href="/signup">Signup</MDBBtn>
            </MDBCol>
        </MDBRow>
    )
};

NavbarAuth.propTypes = {};

export default NavbarAuth;