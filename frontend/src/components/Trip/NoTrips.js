import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardImage,
    MDBRow,
  } from 'mdb-react-ui-kit';
import no_trips from '../../assets/no_trips.jpg'
import AddTrip from './AddTrip';

const NoTrips = ({ previous, open }) => {
  const [openAddTripModal, setOpenAddTripModal] = useState(false);
  return (
    <MDBContainer className="my-5">
        <MDBRow className='d-flex justify-content-center text-center'>
            <MDBCardImage src={no_trips} alt="login form" className='notrips' style={{borderRadius: 30}}/>
            {(previous) ? <h2>No previous trips!</h2> : <h2>Uh.. Oh!  No trips added yet!</h2>}
            {(!previous) && <MDBBtn className="mt-3 btn-custom w-25" size="md" onClick={() => setOpenAddTripModal(true)}>Add Trip</MDBBtn>}
        </MDBRow>
        <AddTrip open={openAddTripModal} close={() => setOpenAddTripModal(false)} />

    </MDBContainer>
  );
};

export default NoTrips;
