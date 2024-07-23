import React, { useState } from 'react';
import axios from 'axios';
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

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/forgot-password', { email });
      setMessage(response.data.msg);
    } catch (error) {
      setMessage(error.response.data.msg || 'Invalid request');
    }
  };

  return (
    <MDBContainer className="my-5" style={{maxWidth: '75%'}}>

      <MDBCard className='' style={{borderRadius: 30}}>
        <MDBRow className='flex justify-content-between' style={{borderRadius: 30}}>

          <MDBCol md='6' style={{marginLeft: "3%"}}>
            <MDBCardBody className='d-flex flex-column align-items-center mt-4'>

              <div className='d-flex flex-row justify-content-center mt-2 mb-5'>
                <MDBIcon fas icon="umbrella-beach fa-3x me-3" style={{ color: '#04b4bd' }}/>
                <span className="h1 fw-bold mb-0">Travel Planner</span>
              </div>

              <form className='w-80 mt-5' onSubmit={handleSubmit}>

                <div className='mb-4'>
                    <span className="h3 fw-normal mt-4">Forgot your password?</span>
                </div>

                <p>{message}</p>

                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLgEmail' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                

                <MDBBtn type='submit' className="mb-4 px-5 btn-custom" size="md">Submit</MDBBtn>
              
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

export default ForgotPassword;
