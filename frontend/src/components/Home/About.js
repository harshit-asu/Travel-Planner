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
  MDBTextArea,
  MDBIcon
} from 'mdb-react-ui-kit';
import login_page from '../../assets/login_page.jpg'
import { login } from '../../services/api';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import CustomAlert from '../Misc/CustomAlert';
import Loading from '../Misc/Loading';
import { useAuth } from '../../AuthProvider';
import AboutCard from './AboutCard';
import harshitImage from '../../assets/Harshit_LinkedIn_Dp.jpeg';
import swathiImage from '../../assets/swathi_new.jpg';

const About = props => {
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

      <MDBCard className='' style={{ borderRadius: 30, width: '80%', boxShadow: 'none' }}>
        <MDBRow style={{ borderRadius: 30 }}>

          <MDBCol md='12' className='d-flex flex-column justify-content-center'>
            <MDBCardBody className='d-flex flex-column flex-grow-0 gap-2 align-items-center'>

              <div className='d-flex flex-row justify-content-center mt-2 mb-2'>
                <span className="h1 fw-bold mb-4" style={{ color: '#04b4bd' }} >Meet the team <MDBIcon fas icon="code" /></span>
              </div>

              <MDBRow className='w-100' style={{ justifyContent: 'space-around', padding: 0 }} >
                <MDBCol md={5}>
                  <AboutCard name={"Harshit Allumolu"} picture={harshitImage} description={"Software Engineer"} linkedin="https://www.linkedin.com/in/harshit-allumolu/" email="mailto:harshit.allumolu@asu.edu" github="https://github.com/harshit-asu" />
                </MDBCol>
                <MDBCol md={5}>
                  <AboutCard name={"Swathi Anaji Revanasiddappa"} picture={swathiImage} description={"Software Engineer"} linkedin="https://www.linkedin.com/in/swathi-anaji-r/"  email="mailto:swathi.anaji@asu.edu" github="https://github.com/swathianaji" />
                </MDBCol>
              </MDBRow>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
};

export default About;
