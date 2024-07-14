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
import axios from 'axios';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] =  useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
      console.log(response);
      // setToken(response.data.access_token);
      setMessage('Login successful');
    } catch (error) {
      setMessage(error.response.data.msg || 'Login failed');
    }
  };


  return (
    <MDBContainer className="my-5">

      <MDBCard className='' style={{borderRadius: 30}}>
        <MDBRow style={{borderRadius: 30}}>

          <MDBCol md='5'>
            <MDBCardImage src={login_page} alt="login form" className='w-100' style={{borderRadius: 30}}/>
          </MDBCol>

          <MDBCol md='6' style={{marginLeft: "3%"}}>
            <MDBCardBody className='d-flex flex-column align-items-center mt-4'>

              <div className='d-flex flex-row justify-content-center mt-2 mb-2'>
                <MDBIcon fas icon="umbrella-beach fa-3x me-3" style={{ color: '#04b4bd' }}/>
                <span className="h1 fw-bold mb-0">Travel Planner</span>
              </div>

              <form className='w-50 mt-4' onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <span className="h3 fw-normal mt-4">Login</span>
                </div>

                <p>{message}</p>

                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLgEmail' type='email' size="lg" value={email} onChange={(event) => {setEmail(event.target.value)}} />
                <MDBInput label='Password' id='formControlLgPassword' type='password' size="lg" value={password} onChange={(event) => setPassword(event.target.value)}  />
                <div className='mb-4 text-end mt-1'>
                    <a className="small fw-light" style={{color: '#04b4bd'}} href="/forgot-password">Forgot password?</a>
                </div>

                <MDBBtn type="submit" className="mb-4 px-5 btn-custom w-100" size="md" >Login</MDBBtn>
              
              </form>

            <div className='mt-2'>
                <p className="mb-5 fw-light">Don't have an account? <a href="/signup" style={{color: '#04b4bd'}}>Register here</a></p>
            </div>
              

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
};

export default Login;
