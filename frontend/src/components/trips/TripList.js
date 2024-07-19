import React, {useState} from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBBtn,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from "mdb-react-ui-kit";
import TripListItem from "../Trip/TripListItem";
import AddTrip from "../Trip/AddTrip";


const TripList = () => {
  const [basicActive, setBasicActive] = useState('Upcoming Trips');

  const [openAddTripModal, setOpenAddTripModal] = useState(false);

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  const closeAddTripModal = () => {
    setOpenAddTripModal(false);
  }

  return (
    // <NoTrips />
        <MDBContainer fluid className="vh-100 mt-3">
              <MDBCard >
                <MDBCardHeader className="p-3">
                  <MDBRow>
                    <MDBCol md={8} className="d-flex flex-column justify-content-center">
                      <h4 className="mb-0 ms-4 ps-2" style={{ color: '#04b4bd' }}>
                        {/* <MDBIcon fas icon="chevron-right" className="me-2" /> */}
                        <strong>My Trips (10)</strong>
                      </h4>
                    </MDBCol>
                    <MDBCol md={4} className="d-flex justify-content-end pe-5">
                      <MDBBtn className="mb-0 px-5 btn-custom " size="md" onClick={() => setOpenAddTripModal(true)}>Add Trip</MDBBtn>
                      <AddTrip open={openAddTripModal} close={closeAddTripModal} />
                    </MDBCol>
                  </MDBRow>
                </MDBCardHeader>
                {/* <MDBScrollbar style={{ position: "relative", height: "400px" }}> */}
                <MDBCardBody>
                  <MDBRow className="m-2">
                    <MDBCol className="mx-3 px-4 px-1" style={{ border: '1.5px solid #808080', borderRadius: '50px' }}>
                      <MDBRow className="d-flex align-items-center w-100 px-0">
                        <MDBCol className="d-flex align-items-center" md='10'>
                          <input type="text" placeholder="Search trip by name" className="search-input w-100" />
                        </MDBCol>
                        <MDBCol className="d-flex justify-content-end" md='2'>
                          <button style={{ backgroundColor: 'white', border: "0px" }}>
                            <MDBIcon fas icon="search fa-1.5x" style={{ color: '#808080' }} />
                          </button>
                        </MDBCol>
                      </MDBRow>
                    </MDBCol>
                    <MDBCol className="mx-3 px-4 d-flex align-items-center w-100" style={{ border: '1.5px solid #808080', borderRadius: '50px' }}>
                      <MDBRow className="d-flex align-items-center w-100 px-0">
                        <MDBCol className="d-flex align-items-center" md='10'>
                          <input type="text" placeholder="Search trip by creator" className="search-input w-100" />
                        </MDBCol>
                        <MDBCol className="d-flex justify-content-end" md='2'>
                          <button style={{ backgroundColor: 'white', border: "0px" }}>
                            <MDBIcon fas icon="search fa-1.5x" style={{ color: '#808080' }} />
                          </button>

                        </MDBCol>
                      </MDBRow>
                    </MDBCol>

                  </MDBRow>
                  <MDBRow className="m-4 rounded" >
                  <MDBCard >
                    <MDBCardHeader>
                    <MDBTabs >
                      <MDBCol>
                      <MDBTabsItem>
                        <MDBTabsLink className="text-center" style={{borderRadius: '10px 0px 0px 10px'}} onClick={() => handleBasicClick('Upcoming Trips')} active={basicActive === 'Upcoming Trips'}>
                          Upcoming Trips
                        </MDBTabsLink>
                      </MDBTabsItem>
                      </MDBCol>
                      <MDBCol>
                      <MDBTabsItem>
                        <MDBTabsLink className='text-center' style={{borderRadius: '0px 10px 10px 0px'}} onClick={() => handleBasicClick('Previous Trips')} active={basicActive === 'Previous Trips'}>
                          Previous Trips
                        </MDBTabsLink>
                      </MDBTabsItem>
                      </MDBCol>
                    </MDBTabs>
                    </MDBCardHeader>
                  <MDBCardBody>
                    <MDBTabsContent>
                      <MDBTabsPane open={basicActive === 'Upcoming Trips'}>
                        <MDBRow>
                          <MDBCol md='4'>
                              <TripListItem />
                          </MDBCol>
                          <MDBCol md='4'>
                              <TripListItem />
                          </MDBCol>
                          <MDBCol md='4'>
                              <TripListItem />
                          </MDBCol>
                    
                        </MDBRow>
                      </MDBTabsPane>
                      <MDBTabsPane open={basicActive === 'Previous Trips'}>Previous Trips content</MDBTabsPane>
                    </MDBTabsContent>
                    </MDBCardBody>
                    </MDBCard>
                  </MDBRow>

                </MDBCardBody>
                {/* </MDBScrollbar> */}
              </MDBCard>
        </MDBContainer>
  );
};

export default TripList;
