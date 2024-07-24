import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCardImage,
    MDBRow,
  } from 'mdb-react-ui-kit';
import no_accommodation from '../../assets/no_accommodation.png';
import AddAccommodation from './AddAccommodation';

const NoAccommodation = ( {trip, open, close, setOpen, setAlertData, fetchAccommodations} ) => {
  return (
    <MDBContainer className="my-5">
        <MDBRow className='d-flex justify-content-center text-center'>
            <MDBCardImage src={no_accommodation} alt="No accommodation" className='notrips mb-4' style={{borderRadius: 30}}/>
            <h2>Uh.. Oh!  No accommodations added yet!</h2>
            <MDBBtn className="mt-3 btn-custom w-25" size="md" onClick={() => setOpen(true) }>Add Accommodation</MDBBtn>
        </MDBRow>
        <AddAccommodation trip={trip} open={open} close={close} setAlertData={setAlertData} fetchAccommodations={fetchAccommodations} />

    </MDBContainer>
  );
};

export default NoAccommodation;