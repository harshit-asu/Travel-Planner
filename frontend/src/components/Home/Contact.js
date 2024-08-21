import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBTextArea
} from 'mdb-react-ui-kit';
import login_page from '../../assets/login_page.jpg'
import { login } from '../../services/api';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import CustomAlert from '../Misc/CustomAlert';
import Loading from '../Misc/Loading';
import { useAuth } from '../../AuthProvider';

const Contact = props => {
  const { auth, setAuth } = useAuth();
  const { state } = useLocation();

  const [isDataLoading, setIsDataLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [alertData, setAlertData] = useState(state?.alertData || {
    "showAlert": false,
    "severity": "",
    "message": ""
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDataLoading(true);
    try {
      setAlertData({
        "showAlert": true,
        "severity": "success",
        "message": "Success!"
      });
      setDescription('');
      setEmail("");
      setName("");
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

  if (isDataLoading) {
    return <Loading />
  }


  return (
    <MDBContainer className="my-5" style={{ maxWidth: '80%', display: 'flex', justifyContent: 'center' }}>
      <CustomAlert alertData={alertData} setAlertData={setAlertData} />

      <MDBCard className='' style={{ borderRadius: 30, width: '50%' }}>
        <MDBRow style={{ borderRadius: 30 }}>

          <MDBCol md='12' className='d-flex flex-column justify-content-center my-4'>
            <MDBCardBody className='d-flex flex-column flex-grow-0 gap-2 align-items-center'>

              <div className='d-flex flex-row justify-content-center mt-2 mb-2'>
                <span className="h1 fw-bold mb-4" style={{ color: '#04b4bd' }} >Contact Us</span>
              </div>

              <form className='w-100 mt-2' onSubmit={handleSubmit} style={{ maxWidth: '70%' }}>

                <MDBInput wrapperClass='mb-4' label='Your Name' id='name' type='text' size="lg" value={name} onChange={(event) => { setName(event.target.value) }} required />
                <MDBInput wrapperClass='mb-4' label='Your Email Address' id='email' type='email' size="lg" value={email} onChange={(event) => { setEmail(event.target.value) }} required />
                <MDBTextArea wrapperClass='mb-4' label='Describe your query' id='description' type='text' size="lg" value={description} onChange={(event) => { setDescription(event.target.value) }} required />
                {/* <MDBInput wrapperClass='' label='Password' id='password' type='password' size="lg" value={password} onChange={(event) => setPassword(event.target.value)} required /> */}

                <MDBBtn type="submit" className="mb-4 px-5 btn-custom w-100" size="md" >Submit</MDBBtn>

              </form>

              <div className='mt-2'>
                  <p className="fw-light" style={{color: 'gray'}} >We will try to respond to your queries as soon as possible!</p>
              </div>


            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
};

export default Contact;
