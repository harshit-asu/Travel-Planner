import React from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBIcon,
    MDBRow,
    MDBBtn,
    MDBCardImage,
    MDBCardTitle,
    MDBCardHeader
  } from 'mdb-react-ui-kit';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../../Utils';

const TripMember = ({ member, currentUserId }) => {
  return (
    <div className='profile-data d-flex flex-row flex-grow-0 gap-3 align-items-center'>
        <Avatar {...stringAvatar(member.name)} />
        <MDBCardTitle className='mt-2 d-flex flex-column justify-content-center' >{`${member.name}${(member.user_id === currentUserId) ? ` (You)` : ``}`}</MDBCardTitle>
    </div>
  )
}

export default TripMember