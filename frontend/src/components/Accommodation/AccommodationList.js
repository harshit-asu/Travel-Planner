import React,{act, useCallback, useEffect, useState} from 'react'
import {
  MDBCardBody,
  MDBCard,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
} from 'mdb-react-ui-kit'
import AccommodationListItem from './AccommodationListItem'
import AddAccommodation from './AddAccommodation'
import { getAccommodations } from '../../services/api'
import NoAccommodation from './NoAccommodation'
import Loading from '../Misc/Loading'
import CustomAlert from '../Misc/CustomAlert'

const AccommodationList = ({ trip }) => {
  const [openAddAccommodationModal, setOpenAddAccommodationModal] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [alertData, setAlertData] = useState({
    showAlert: false,
    severity: "",
    message: ""
  })
  const closeAddAccommodationModal = () => {
    setOpenAddAccommodationModal(false);
  }

  const [accommodations, setAccommodations] = useState([]);

  const fetchAccommodations = useCallback(async () => {
    setIsDataLoading(true);
    try {
      const { data } = await getAccommodations(trip.trip_id);
      setAccommodations(data.accommodations);
    } catch (error) {
      console.log(error);
    }
    setIsDataLoading(false);
  }, [trip]);

  useEffect(() => {
    fetchAccommodations();
  }, [fetchAccommodations]);

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
                <strong>Accommodations ({accommodations.length})</strong>
              </h4>
            </MDBCol>
            <MDBCol md={4} className="d-flex justify-content-end pe-4">
              <MDBBtn className="mb-0 me-2 px-5 btn-custom " size="md" onClick={() => setOpenAddAccommodationModal(true)}>Add Accommodation</MDBBtn>
              <AddAccommodation trip={trip} open={openAddAccommodationModal} close={closeAddAccommodationModal} fetchAccommodations={fetchAccommodations} setAlertData={setAlertData} />
            </MDBCol>
          </MDBRow>
        </MDBCardHeader>
        <MDBCardBody>
          { (accommodations.length !== 0) ? accommodations.map((d) => <AccommodationListItem key={d.destination_id} d={d} fetchAccommodations={fetchAccommodations} setAlertData={setAlertData} trip={trip} /> ) : <NoAccommodation trip={trip} open={openAddAccommodationModal} close={closeAddAccommodationModal} setOpen={setOpenAddAccommodationModal} setAlertData={setAlertData} fetchAccommodations={fetchAccommodations} />}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
}

AccommodationList.propTypes = {}

export default AccommodationList