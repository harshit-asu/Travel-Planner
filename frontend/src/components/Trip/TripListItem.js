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
} from 'mdb-react-ui-kit';
import login_page from '../../assets/login_page.jpg'

const TripListItem = props => {
  return (
    <div className='p-3'>
      <MDBCard>
        <div sstyle={{ maxHeight: '40%', maxWidth: '100%', overflow: 'hidden' }}>
          <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' position='top' alt='..' style={{ objectFit: 'contain', width: '100%', height: '40%' }} />
        </div>
        <MDBCardBody>
          <MDBCardTitle>California</MDBCardTitle>
          <MDBCardText>
           <MDBIcon fas icon="user-circle fa-1.5x" style={{ color: '#04b4bd' }} /> Swathi Anaji with 2 Others
           <br/>
           <MDBIcon fas icon="calendar-alt fa-1.5x" style={{ color: '#04b4bd' }} /> StartDate - EndDate
          </MDBCardText>
          <div className='d-flex justify-content-center'>
            <MDBBtn className="mb-0 px-3 btn-custom " size="md">View details</MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

TripListItem.propTypes = {}

export default TripListItem