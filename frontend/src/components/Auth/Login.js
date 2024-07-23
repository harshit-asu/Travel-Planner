import React, { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput
  } from 'mdb-react-ui-kit';
import login_page from '../../assets/login_page.jpg'
import { login } from '../../services/api';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import CustomAlert from '../Misc/CustomAlert';
import Loading from '../Misc/Loading';
import { useAuth } from '../../AuthProvider';

const Login = props => {
  const { auth, setAuth } = useAuth();
  const { state } = useLocation();

  const [isDataLoading, setIsDataLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] =  useState("");
  const [alertData, setAlertData] = useState(state?.alertData || {
    "showAlert": false,
    "severity": "",
    "message": ""
  });
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsDataLoading(true);
    try {
      const { data } = await login(username, password);
      if(data?.token){
        localStorage.setItem("access_token", data.token);
        setAuth(true);
        navigate('/dashboard', { state: { isDataLoading: true } });
      }
      else{
        setAlertData({
          "showAlert": true,
          "severity": "error",
          "message": data.message
        });
      }
    } catch (error) {
      setAlertData({
        "showAlert": true,
        "severity": "error",
        "message": error
      });
      console.log(error);
    }
    setIsDataLoading(false);
  };

  if(isDataLoading){
    return <Loading />
  }


  return (
    <MDBContainer className="my-5" style={{maxWidth: '75%'}}>
      <CustomAlert alertData={alertData} setAlertData={setAlertData} />

      <MDBCard className='' style={{borderRadius: 30}}>
        <MDBRow style={{borderRadius: 30}}>

          <MDBCol md='5'>
            <MDBCardImage src={login_page} alt="login form" className='w-100' style={{borderRadius: 30}}/>
          </MDBCol>

          <MDBCol md='6' style={{marginLeft: "3%"}} className='d-flex flex-column justify-content-center'>
            <MDBCardBody className='d-flex flex-column flex-grow-0 gap-2 align-items-center'>

              <div className='d-flex flex-row justify-content-center mt-2 mb-2'>
                <span className="h1 fw-bold mb-4" style={{ color: '#04b4bd' }} >Login</span>
              </div>

              <form className='w-100 mt-2' onSubmit={handleLogin} style={{maxWidth: '70%'}}>

                <MDBInput wrapperClass='mb-4' label='Username' id='username' type='username' size="lg" value={username} onChange={(event) => {setUsername(event.target.value)}} required />
                <MDBInput wrapperClass='' label='Password' id='password' type='password' size="lg" value={password} onChange={(event) => setPassword(event.target.value)} required />
                <div className='mb-4 text-end mt-1'>
                    <a className="small fw-light" style={{color: '#04b4bd', cursor: 'pointer'}} onClick={() => navigate('/forgot-password')}>Forgot password?</a>
                </div>

                <MDBBtn type="submit" className="mb-4 px-5 btn-custom w-100" size="md" >Login</MDBBtn>
              
              </form>

            <div className='mt-2'>
                <p className="fw-light" style={{color: 'gray'}} >Don't have an account? <Link to={'/signup'} style={{ color: '#04b4bd' }} >Register here</Link></p>
            </div>
              

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
};

export default Login;
