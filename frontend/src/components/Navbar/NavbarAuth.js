import React from "react";
import PropTypes from "prop-types";
import { MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const NavbarAuth = (props) => {

    let navigate = useNavigate();

    return (
        <MDBRow className="me-2">
            <MDBCol md={6}> 
                <MDBBtn color="light" onClick={() => navigate('/login')}>Login</MDBBtn>
            </MDBCol>
            <MDBCol md={6}> 
                <MDBBtn color="light" onClick={() => navigate('/signup')}>Signup</MDBBtn>
            </MDBCol>
        </MDBRow>
    )
};

NavbarAuth.propTypes = {};

export default NavbarAuth;