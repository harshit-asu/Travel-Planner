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

const Signup = () => {

    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://127.0.0.1:5000/signup', { first_name, last_name, email, password });
          setMessage(response.data.msg);
        } catch (error) {
          setMessage(error.response.data.msg || 'Registration failed');
        }
    };
    

    return (
        <MDBContainer className="my-5">

            <MDBCard className='' style={{ borderRadius: 30 }}>
                <MDBRow style={{ borderRadius: 30 }}>

                    <MDBCol md='5'>
                        <MDBCardImage src={login_page} alt="login form" className='w-100' style={{ borderRadius: 30 }} />
                    </MDBCol>

                    <MDBCol md='6' style={{ marginLeft: "3%"}}>
                        <MDBCardBody className='d-flex flex-column align-items-center mt-4'>

                            <div className='d-flex flex-row justify-content-center mt-2 mb-2'>
                                <MDBIcon fas icon="umbrella-beach fa-3x me-3" style={{ color: '#04b4bd' }} />
                                <span className="h1 fw-bold mb-0">Travel Planner</span>
                            </div>
                            <form className='w-80 mt-4' onSubmit={handleSubmit}>
                                <div className='mb-4'>
                                    <span className="h3 fw-normal mt-4">Sign up</span>
                                </div>
                                <h1>{message}</h1>
                                <MDBRow className='mb-4'>
                                    <MDBCol>
                                        <MDBInput id='form3Example1' label='First name' size='lg' value={first_name} onChange={(e) => setfirst_name(e.target.value)} />
                                    </MDBCol>
                                    <MDBCol>
                                        <MDBInput id='form3Example2' label='Last name' size='lg' value={last_name} onChange={(e) => setlast_name(e.target.value)} />
                                    </MDBCol>
                                </MDBRow>
                                <MDBInput className='mb-4' type='email' id='form3Example3' label='Email address' size='lg' value={email} onChange={(e) => setEmail(e.target.value)} />
                                <MDBInput className='mb-4' type='password' id='form3Example4' label='Password' size='lg' value={password} onChange={(e) => setPassword(e.target.value)} />

                                <MDBBtn type='submit' className="mb-4 px-5 btn-custom" size="md">Sign in</MDBBtn>


                            </form>
                            <div className='mt-1'>
                                <p className="mb-5 pb-lg-2" style={{ color: '#000000' }}>Already have an account? <a href="/" style={{ color: '#04b4bd' }}>Login</a></p>
                            </div>
                        </MDBCardBody>
                    </MDBCol>

                </MDBRow>

            </MDBCard>

        </MDBContainer>
    );
};

export default Signup;
