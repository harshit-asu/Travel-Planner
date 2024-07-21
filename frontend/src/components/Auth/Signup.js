import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput,
    MDBInputGroup
} from 'mdb-react-ui-kit';
import login_page from '../../assets/login_page.jpg';
import { signup } from '../../services/api';

const Signup = props => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await signup({
            "username": username,
            "password": password,
            "first_name": firstName,
            "last_name": lastName,
            "email": email
          });
          setMessage(response.data.msg);
          navigate('/login');
        } catch (error) {
          setMessage(error.response.data.msg || 'Registration failed');
        }
    };
    

    return (
        <MDBContainer className="my-5" style={{maxWidth: '75%'}}>

            <MDBCard className='' style={{ borderRadius: 30 }}>
                <MDBRow style={{ borderRadius: 30 }}>

                    <MDBCol md='5'>
                        <MDBCardImage src={login_page} alt="Travel Image" className='w-100' style={{ borderRadius: 30 }} />
                    </MDBCol>

                    <MDBCol md='6' style={{ marginLeft: "3%"}}>
                        <MDBCardBody className='d-flex flex-column align-items-center mt-4'>

                            <div className='d-flex flex-row justify-content-center mt-1 mb-1'>
                                <span className="h1 fw-bold mb-0">Welcome Aboard!</span>
                            </div>
                            <MDBRow className='mt-4'>
                              <form className='w-80' onSubmit={handleSubmit}>
                                  <MDBRow className='mb-4'>
                                      <MDBCol>
                                          <MDBInput id='first_name' label='First name' size='lg' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                      </MDBCol>
                                      <MDBCol>
                                          <MDBInput id='last_name' label='Last name' size='lg' value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                                      </MDBCol>
                                  </MDBRow>
                                  <MDBInput className='mb-4' type='email' id='email' label='Email address' size='lg' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                  <MDBInput className='mb-4' type='username' id='username' label='Username' size='lg' value={username} onChange={(e) => setUsername(e.target.value)} required />
                                  <MDBInput className='mb-4' type='password' id='password' label='Password' size='lg' value={password} onChange={(e) => setPassword(e.target.value)} required />

                                  <div className='w-100 d-flex justify-content-center'>
                                    <MDBBtn type='submit' className="mb-2 mt-2 px-5 btn-custom w-100" size="lg">Sign in</MDBBtn>
                                  </div>


                              </form>
                            </MDBRow>
                            <div className='mt-3'>
                                <p className="" style={{ color: '#000000' }}>Already have an account? <a href="/" style={{ color: '#04b4bd' }}>Login</a></p>
                            </div>
                        </MDBCardBody>
                    </MDBCol>

                </MDBRow>

            </MDBCard>

        </MDBContainer>
  )
}

export default Signup