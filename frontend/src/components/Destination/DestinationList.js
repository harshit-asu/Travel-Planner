import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {
  MDBCardBody,
  MDBCard,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBBtn,
} from 'mdb-react-ui-kit'
import DestinationListItem from './DestinationListItem'
import AddDestination from './AddDestination'

const DestinationList = props => {
  const [openAddTripModal, setOpenAddTripModal] = useState(false);
  const closeAddTripModal = () => {
    setOpenAddTripModal(false);
  }
  return (
    <MDBContainer fluid className="vh-100 ">
      <MDBCard >
        <MDBCardHeader className="p-3">
          <MDBRow>
            <MDBCol md={8} className="d-flex flex-column justify-content-center">
              <h4 className="mb-0 ms-4 ps-2" style={{ color: '#04b4bd' }}>

                <strong>Destinations</strong>
              </h4>
            </MDBCol>
            <MDBCol md={4} className="d-flex justify-content-end pe-5">
              <MDBBtn className="mb-0 px-5 btn-custom " size="md" onClick={() => setOpenAddTripModal(true)}>Add Destination</MDBBtn>
              <AddDestination open={openAddTripModal} close={closeAddTripModal}/>
            </MDBCol>
          </MDBRow>
        </MDBCardHeader>
        <MDBCardBody>
          <DestinationListItem />

        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
}

DestinationList.propTypes = {}

export default DestinationList