import React from 'react'
import PropTypes from 'prop-types'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import login_page from '../../assets/login_page.jpg'
import { useNavigate } from 'react-router-dom';

const TripListItem = ({ trip }) => {

  let navigate = useNavigate();

  const navigateToTripDetailsPage = () => {
    navigate(`/trips/${trip.trip_id}`, {
      "trip": trip
    });
    window.location.reload();
  };

  return (
    <div className='p-3'>
      <MDBCard>
        <div sstyle={{ maxHeight: '40%', maxWidth: '100%', overflow: 'hidden' }}>
          <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' position='top' alt='..' style={{ objectFit: 'contain', width: '100%', height: '40%' }} />
        </div>
        <MDBCardBody>
          <MDBCardTitle className='mb-3'><b>{trip.trip_name}</b></MDBCardTitle>
          <MDBCardText className='mt-2'>
            <MDBRow>
              <MDBCol md={1}>
                <MDBIcon fas icon="users fa-1x me-2" style={{ color: '#04b4bd' }} />
              </MDBCol>
              <MDBCol md={11}>
                 <p>{trip.created_by} {(trip.members_count > 1) && `and ${trip.members_count - 1} others`}</p>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md={1}>
              <MDBIcon fas icon="calendar-alt fa-1x me-2" style={{ color: '#04b4bd' }} />
              </MDBCol>
              <MDBCol md={11}>
                 <p>{trip.start_date} - {trip.end_date}</p>
              </MDBCol>
            </MDBRow>
          </MDBCardText>
          <div className='d-flex justify-content-center'>
            <MDBBtn className="mb-0 px-3 btn-custom " size="md" onClick={navigateToTripDetailsPage}>View details</MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

TripListItem.propTypes = {}

export default TripListItem