import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCardImage,
    MDBRow,
  } from 'mdb-react-ui-kit';
import no_transport from '../../assets/no_transport.png';
import AddTransport from './AddTransport';

const NoTransport = ( {trip, open, close, setOpen, setAlertData, fetchTransports} ) => {
  return (
    <MDBContainer className="my-5">
        <MDBRow className='d-flex justify-content-center text-center'>
            <MDBCardImage src={no_transport} alt="No transport" className='notrips' style={{borderRadius: 30}}/>
            <h2>Uh.. Oh!  No transports added yet!</h2>
            <MDBBtn className="mt-3 btn-custom w-25" size="md" onClick={() => setOpen(true) }>Add Transport</MDBBtn>
        </MDBRow>
        <AddTransport trip={trip} open={open} close={close} setAlertData={setAlertData} fetchTransports={fetchTransports} />

    </MDBContainer>
  );
};

export default NoTransport;