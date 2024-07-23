import React, { useState } from 'react';
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
import { resetPassword } from '../../services/api';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <MDBContainer className="my-5" style={{maxWidth: '75%'}}>

      <MDBCard className='' style={{borderRadius: 30}}>
        <MDBRow className='flex justify-content-between' style={{borderRadius: 30}}>

          <MDBCol md='6' style={{marginLeft: "3%"}} className='d-flex flex-column justify-content-center'>
              <MDBCardBody className='d-flex flex-column flex-grow-0 align-items-center'>

                <div className='mt-2 mb-4' >
                  <span className="h1 fw-bold mb-0" style={{ color: '#04b4bd' }} >Reset Password</span>
                </div>

                <form className='w-100 mt-2 text-center' style={{maxWidth: '70%'}}>


                  <p className='mb-4'>Please set a new password for your account.</p>

                  <MDBInput wrapperClass='mb-4' label='New Password' id='formControlLgNewPassword' type='password' size="lg" required value={password} onChange={(e) => setPassword(e.target.value)} />

                  <MDBInput wrapperClass='mb-4' label='Confirm Password' id='formControlLgConfirmPassword' type='password' size="lg" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  
                  <MDBBtn className="mt-2 mb-4 px-5 btn-custom w-100" size="md" type='submit' >Submit</MDBBtn>
                
                </form>

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
