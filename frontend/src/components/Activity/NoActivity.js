import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCardImage,
    MDBRow,
  } from 'mdb-react-ui-kit';
import no_activity from '../../assets/no_activity.jpg';
import AddActivity from './AddActivity';

const NoActivity = ( {trip, open, close, setOpen, setAlertData} ) => {
  return (
    <MDBContainer className="my-5">
        <MDBRow className='d-flex justify-content-center text-center'>
            <MDBCardImage src={no_activity} alt="No activity" className='notrips' style={{borderRadius: 30}}/>
            <h2>Uh.. Oh!  No activities added yet!</h2>
            <MDBBtn className="mt-3 btn-custom w-25" size="md" onClick={() => setOpen(true) }>Add Activity</MDBBtn>
        </MDBRow>
        <AddActivity trip={trip} open={open} close={close} setAlertData={setAlertData} />

    </MDBContainer>
  );
};

export default NoActivity;