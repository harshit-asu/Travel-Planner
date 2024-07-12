import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
  } from 'mdb-react-ui-kit';
import login_page from '../../assets/login_page.jpg'

const ResetPassword = () => {
  return (
    <MDBContainer className="my-5">

      <MDBCard className='' style={{borderRadius: 30}}>
        <MDBRow className='flex justify-content-between' style={{borderRadius: 30}}>

          <MDBCol md='6' style={{marginLeft: "3%"}}>
            <MDBCardBody className='d-flex flex-column align-items-center'>

              <div className='d-flex flex-row justify-content-center mt-2 mb-5'>
                <MDBIcon fas icon="umbrella-beach fa-3x me-3" style={{ color: '#04b4bd' }}/>
                <span className="h1 fw-bold mb-0">Travel Planner</span>
              </div>

              <div className='w-80 mt-2'>

                <h3 className="fw-normal my-4 mb-1">Reset Password</h3>
                <p className='mb-4'>Please set a new password for your account.</p>

                <MDBInput wrapperClass='mb-4' label='New Password' id='formControlLgNewPassword' type='password' size="lg"/>

                <MDBInput wrapperClass='mb-4' label='Confirm Password' id='formControlLgConfirmPassword' type='password' size="lg"/>
                
                <MDBBtn className="mb-4 px-5 btn-custom" size="md">Submit</MDBBtn>
              
              </div>

            </MDBCardBody>
          </MDBCol>

          <MDBCol md='5'>
            <MDBCardImage src={login_page} alt="login form" className='w-100' style={{borderRadius: 30}}/>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
};

export default ResetPassword;
