import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardImage,
    MDBRow,
  } from 'mdb-react-ui-kit';
import no_trips from '../../assets/no_trips.jpg'

const NoTrips = () => {
  return (
    <MDBContainer className="my-5">
      <MDBCard className='' style={{borderRadius: 30}}>
        <MDBRow className='d-flex justify-content-center text-center'>
            <MDBCardImage src={no_trips} alt="login form" className='notrips' style={{borderRadius: 30, marginLeft: 100}}/>
            <h2>Uh.. Oh!  No trips added yet!</h2>
            <MDBBtn className="mb-5 mt-2 btn-custom w-25" size="md">Add Trip</MDBBtn>
        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
};

export default NoTrips;
