import React,{useCallback, useEffect, useState} from 'react'
import { 
  MDBCol, 
  MDBContainer, 
  MDBRow, 
  MDBCard, 
  MDBCardText, 
  MDBCardBody, 
  MDBCardImage, 
  MDBTypography, 
  MDBIcon,
  MDBSpinner
} from 'mdb-react-ui-kit';
import EditProfile from './EditProfile';
import { getUserProfile } from '../../services/api';
import { useAuth } from '../../AuthProvider';
import Loading from '../Misc/Loading';
import { useLocation } from 'react-router-dom';
import CustomAlert from '../Misc/CustomAlert';

const ViewProfile = props => {
  const { state } = useLocation();
  const [openAddTripModal, setOpenAddTripModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [alertData, setAlertData] = useState({
    showAlert: false,
    severity: "",
    message: ""
  });

  const { userId } = useAuth();

  const fetchUserData = useCallback(async () => {
    setIsDataLoading(true);
    if(!userId){
      return;
    }
    if(state?.alertData){
      setAlertData(state?.alertData);
    }
    const { data } = await getUserProfile(userId);
    setUser(data.users[0]);
    setIsDataLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const closeAddTripModal = () => {
    setOpenAddTripModal(false);
  }

  if(isDataLoading){
    return (
      <Loading />
    );
  }
  else{
    return (
      <section className="h-100" style={{ backgroundColor: '#f4f5f7' }}>
        <CustomAlert alertData={alertData} setAlertData={setAlertData} />
        <MDBContainer className="py-4 vh-100 px-0 my-0">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="8" className="mb-4 mb-lg-0">
              <MDBCard className="mb-5" style={{ borderRadius: '.5rem' }}>
                <MDBRow className="g-0">
                  <MDBCol md="4" className="gradient-custom text-center text-white"
                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', backgroundColor:"#04b4bd"}}>
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar" className="my-5" style={{ width: '80px',  }} fluid />
                    <MDBTypography tag="h5" style={{color:"white"}}>{user.username}</MDBTypography>      
                    <MDBIcon onClick={() => setOpenAddTripModal(true)} style={{color:"white", cursor: 'pointer'}} far icon="edit mb-5" />
                      <EditProfile open={openAddTripModal} close={closeAddTripModal} user={user} setAlertData={setAlertData} fetchUserData={fetchUserData} />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6"><b>Profile</b></MDBTypography>
                      <hr className="mt-0 mb-2" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">First Name</MDBTypography>
                          <MDBCardText className="text-muted">{user.first_name}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-4">
                          <MDBTypography tag="h6">Last Name</MDBTypography>
                          <MDBCardText className="text-muted">{user.last_name}</MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <MDBTypography tag="h6"><b>Contact Information</b></MDBTypography>
                      <hr className="mt-1 mb-2" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Email</MDBTypography>
                          <MDBCardText className="text-muted">{user.email}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Phone</MDBTypography>
                          <MDBCardText className="text-muted">{(user.phone_number) ? user.phone_number : 'No phone number added'}</MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <div className="d-flex justify-content-start" >
                        <a href="#!" style={{color:"#04b4bd"}}><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                        <a href="#!" style={{color:"#04b4bd"}}><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                        <a href="#!" style={{color:"#04b4bd"}}><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                      </div>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }
}

export default ViewProfile