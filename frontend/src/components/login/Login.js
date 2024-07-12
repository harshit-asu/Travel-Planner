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

const Login = () => {
  return (
    <MDBContainer className="my-5">

      <MDBCard className='' style={{borderRadius: 30}}>
        <MDBRow style={{borderRadius: 30}}>

          <MDBCol md='5'>
            <MDBCardImage src={login_page} alt="login form" className='w-100' style={{borderRadius: 30}}/>
          </MDBCol>

          <MDBCol md='6' style={{marginLeft: "3%"}}>
            <MDBCardBody className='d-flex flex-column align-items-center'>

              <div className='d-flex flex-row justify-content-center mt-2 mb-2'>
                <MDBIcon fas icon="umbrella-beach fa-3x me-3" style={{ color: '#04b4bd' }}/>
                <span className="h1 fw-bold mb-0">Travel Planner</span>
              </div>
              <span className="h2 fw-bold mt-4">Login</span>

              <form className='w-80 mt-4'>

                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLgEmail' type='email' size="lg"/>
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLgPassword' type='password' size="lg"/>

                <MDBBtn type="submit" className="mb-4 px-5 btn-custom" size="md">Login</MDBBtn>
              
              </form>

            <div className='mt-2'>
                <a className="small text-muted" href="/forgot-password">Forgot password?</a>
                <p className="mb-5 pb-lg-2" style={{color: '#000000'}}>Don't have an account? <a href="/signup" style={{color: '#04b4bd'}}>Register here</a></p>
            </div>
              

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
};

export default Login;
