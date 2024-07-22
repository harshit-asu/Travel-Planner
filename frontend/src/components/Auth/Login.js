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
import { login } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Login = props => {

  const [username, setUsername] = useState("");
  const [password, setPassword] =  useState("");
  const [message, setMessage] = useState("");
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      localStorage.setItem("access_token", response.data.token)
      setMessage('Login successful');
      navigate('/');
      window.location.reload();
    } catch (error) {
      setMessage(error.response.data.msg || 'Login failed');
    }
  };


  return (
    <MDBContainer className="my-5" style={{maxWidth: '75%'}}>

      <MDBCard className='' style={{borderRadius: 30}}>
        <MDBRow style={{borderRadius: 30}}>

          <MDBCol md='5'>
            <MDBCardImage src={login_page} alt="login form" className='w-100' style={{borderRadius: 30}}/>
          </MDBCol>

          <MDBCol md='6' style={{marginLeft: "3%"}} className='d-flex flex-column justify-content-center'>
            <MDBCardBody className='mt-4 d-flex flex-column align-items-center'>

              <div className='d-flex flex-row justify-content-center mt-2 mb-2'>
                <span className="h1 fw-bold mb-4">Login</span>
              </div>

              <form className='w-100 mt-4' onSubmit={handleLogin} style={{maxWidth: '70%'}}>

                <MDBInput wrapperClass='mb-4' label='Username' id='username' type='username' size="lg" value={username} onChange={(event) => {setUsername(event.target.value)}} required />
                <MDBInput label='Password' id='password' type='password' size="lg" value={password} onChange={(event) => setPassword(event.target.value)} required />
                <div className='mb-4 text-end mt-1'>
                    <a className="small fw-light" style={{color: '#04b4bd', cursor: 'pointer'}} onClick={() => navigate('/forgot-password')}>Forgot password?</a>
                </div>

                <MDBBtn type="submit" className="mb-4 px-5 btn-custom w-100" size="md" >Login</MDBBtn>
              
              </form>

            <div className='mt-2'>
                <p className="fw-light">Don't have an account? <a onClick={() => navigate('/signup')} style={{color: '#04b4bd', cursor: 'pointer'}}>Register here</a></p>
            </div>
              

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
};

export default Login;
