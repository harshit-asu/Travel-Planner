import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import CustomAlert from '../Misc/CustomAlert';

const Signup = props => {
    
    const { state } = useLocation();

    const [signupFormData, setSignUpFormData] = useState({
        "first_name": "",
        "last_name": "",
        "email": "",
        "password": "",
        "username": ""
    });
    const [alertData, setAlertData] = useState(state?.alertData || {
        "showAlert": false,
        "severity": "",
        "message": ""
    });
    let navigate = useNavigate();


    const handleFormChange = (e) => {
        e.preventDefault();
        try {
            const { name, value } = e.target;
            setSignUpFormData({
                ...signupFormData,
                [name]: value,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const validateData = () => {
        if(signupFormData.password.length < 8){
            setAlertData({
                "showAlert": true,
                "severity": "error",
                "message": "Password should contain at least 8 characters."
            });
            return false;
        }
        else{
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validateData()){
            return;
        }
        try {
            const response = await signup(signupFormData);
            if(response.status === 201){
                navigate('/login', {
                    state: {
                        "alertData": {
                            "showAlert": true,
                            "severity": "success",
                            "message": response.data.message
                        }
                    }
                });
            }
            else{
                setAlertData({
                    "showAlert": true,
                    "severity": "error",
                    "message": response.data.message
                });
            }
        } catch (error) {
            setAlertData({
                "showAlert": true,
                "severity": "error",
                "message": error.response.message
            });
        }
    };


    return (
        <MDBContainer className="my-5" style={{ maxWidth: '75%' }}>
            <CustomAlert alertData={alertData} setAlertData={setAlertData} />

            <MDBCard className='' style={{ borderRadius: 30 }}>
                <MDBRow style={{ borderRadius: 30 }}>

                    <MDBCol md='5'>
                        <MDBCardImage src={login_page} alt="Travel Image" className='w-100' style={{ borderRadius: 30 }} />
                    </MDBCol>

                    <MDBCol md='6' style={{ marginLeft: "3%" }} className='d-flex flex-column justify-content-center'>
                        <MDBCardBody className='d-flex flex-column align-items-center justify-content-center flex-grow-0 gap-2'>

                            <div className='d-flex flex-row justify-content-center mt-1 mb-1'>
                                <span className="h1 fw-bold mb-0" style={{ color: '#04b4bd' }} >Welcome Aboard!</span>
                            </div>
                            <MDBRow className='mt-4'>
                                <form className='w-80' onSubmit={handleSubmit}>
                                    <MDBRow className='mb-4'>
                                        <MDBCol>
                                            <MDBInput id='first_name' name='first_name' label='First name' size='lg' value={signupFormData.first_name} onChange={handleFormChange} required />
                                        </MDBCol>
                                        <MDBCol>
                                            <MDBInput id='last_name' name='last_name' label='Last name' size='lg' value={signupFormData.last_name} onChange={handleFormChange} required />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBInput className='mb-4' type='email' id='email' name='email' label='Email address' size='lg' value={signupFormData.email} onChange={handleFormChange} required />
                                    <MDBInput className='mb-4' type='username' id='username' name='username' label='Username' size='lg' value={signupFormData.username} onChange={handleFormChange} required />
                                    <MDBInput className='mb-4' type='password' id='password' name='password' label='Password' size='lg' value={signupFormData.password} onChange={handleFormChange} required />

                                    <div className='w-100 d-flex justify-content-center'>
                                        <MDBBtn type='submit' className="mb-2 mt-2 px-5 btn-custom w-100" size="lg">Sign Up</MDBBtn>
                                    </div>


                                </form>
                            </MDBRow>
                            <div className='mt-3'>
                                <p className="" style={{ color: 'gray' }}>Already have an account? <Link to={'/login'} style={{ color: '#04b4bd' }} >Login</Link> </p>
                            </div>
                        </MDBCardBody>
                    </MDBCol>

                </MDBRow>

            </MDBCard>

        </MDBContainer>
    )
}

export default Signup