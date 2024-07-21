import React,{useCallback, useEffect, useState} from 'react'
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
import { getDestinations } from '../../services/api'

const DestinationList = ({ trip_id }) => {
  const [openAddTripModal, setOpenAddTripModal] = useState(false);
  const closeAddTripModal = () => {
    setOpenAddTripModal(false);
  }

  const [destinations, setDestinations] = useState([]);

  const fetchDestinations = useCallback(async () => {
    try {
      const { data } = getDestinations(trip_id);
      setDestinations(data.destinations);
    } catch (error) {
      console.log(error);
    }
  }, [trip_id]);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);



  return (
    <MDBContainer fluid className="vh-100 ">
      <MDBCard >
        <MDBCardHeader className="p-3">
          <MDBRow>
            <MDBCol md={8} className="d-flex flex-column justify-content-center">
              <h4 className="mb-0 ms-4 ps-2" style={{ color: '#04b4bd' }}>

                <strong>Destinations ({destinations.length})</strong>
              </h4>
            </MDBCol>
            <MDBCol md={4} className="d-flex justify-content-end pe-4">
              <MDBBtn className="mb-0 me-2 px-5 btn-custom " size="md" onClick={() => setOpenAddTripModal(true)}>Add Destination</MDBBtn>
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