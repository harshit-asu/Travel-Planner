import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCardImage,
    MDBRow,
  } from 'mdb-react-ui-kit';
import no_destinations from '../../assets/no_destinations.jpg';
import AddDestination from './AddDestination';

const NoDestinations = ( {trip, open, close, setOpen} ) => {
  return (
    <MDBContainer className="my-5">
        <MDBRow className='d-flex justify-content-center text-center'>
            <MDBCardImage src={no_destinations} alt="No destinations" className='notrips' style={{borderRadius: 30}}/>
            <h2>Uh.. Oh!  No destinations added yet!</h2>
            <MDBBtn className="mt-3 btn-custom w-25" size="md" onClick={() => setOpen(true) }>Add Destination</MDBBtn>
        </MDBRow>
        <AddDestination trip={trip} open={open} close={close} />

    </MDBContainer>
  );
};

export default NoDestinations;
