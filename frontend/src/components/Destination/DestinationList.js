import React,{useCallback, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {
  MDBCardBody,
  MDBCard,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
} from 'mdb-react-ui-kit'
import DestinationListItem from './DestinationListItem'
import AddDestination from './AddDestination'
import { getDestinations } from '../../services/api'
import NoDestinations from './NoDestinations'
import Loading from '../Misc/Loading'
import CustomAlert from '../Misc/CustomAlert'

const DestinationList = ({ trip }) => {
  const [openAddDestinationModal, setOpenAddDestinationModal] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [alertData, setAlertData] = useState({
    showAlert: false,
    severity: "",
    message: ""
  })
  const closeAddDestinationModal = () => {
    setOpenAddDestinationModal(false);
  }

  const [destinations, setDestinations] = useState([]);

  const fetchDestinations = useCallback(async () => {
    setIsDataLoading(true);
    try {
      const { data } = await getDestinations(trip.trip_id);
      setDestinations(data.destinations);
    } catch (error) {
      console.log(error);
    }
    setIsDataLoading(false);
  }, [trip]);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  if(isDataLoading){
    return <Loading />
  }

  return (
    <MDBContainer fluid>
      <CustomAlert alertData={alertData} setAlertData={setAlertData} />
      <MDBCard >
        <MDBCardHeader className="p-3">
          <MDBRow>
            <MDBCol md={8} className="d-flex flex-column justify-content-center">
              <h4 className="mb-0 ms-4 ps-2" style={{ color: '#04b4bd' }}>
                <strong>Destinations ({destinations.length})</strong>
              </h4>
            </MDBCol>
            <MDBCol md={4} className="d-flex justify-content-end pe-4">
              <MDBBtn className="mb-0 me-2 px-5 btn-custom " size="md" onClick={() => setOpenAddDestinationModal(true)}>Add Destination</MDBBtn>
              <AddDestination trip={trip} open={openAddDestinationModal} close={closeAddDestinationModal} fetchDestinations={fetchDestinations} setAlertData={setAlertData} />
            </MDBCol>
          </MDBRow>
        </MDBCardHeader>
        <MDBCardBody>
          { (destinations.length !== 0) ? destinations.map((d) => <DestinationListItem key={d.destination_id} d={d} fetchDestinations={fetchDestinations} setAlertData={setAlertData} trip={trip} /> ) : <NoDestinations trip={trip} open={openAddDestinationModal} close={closeAddDestinationModal} setOpen={setOpenAddDestinationModal} setAlertData={setAlertData} />}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
}

DestinationList.propTypes = {}

export default DestinationList