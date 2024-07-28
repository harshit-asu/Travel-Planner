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
import TransportListItem from './TranportListItem'
import AddTransport from './AddTransport'
import { getTransports } from '../../services/api'
import NoTransport from './NoTransport'
import Loading from '../Misc/Loading'
import CustomAlert from '../Misc/CustomAlert'

const TransportList = ({ trip }) => {
  const [openAddTransportModal, setOpenAddTransportModal] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [alertData, setAlertData] = useState({
    showAlert: false,
    severity: "",
    message: ""
  })
  const closeAddTransportModal = () => {
    setOpenAddTransportModal(false);
  }

  const [transports, setTransports] = useState([]);

  const fetchTransports = useCallback(async () => {
    setIsDataLoading(true);
    try {
      const { data } = await getTransports(trip.trip_id);
      setTransports(data.transports);
    } catch (error) {
      console.log(error);
    }
    setIsDataLoading(false);
  }, [trip]);

  useEffect(() => {
    fetchTransports();
  }, [fetchTransports]);

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
                <strong>Transports ({transports.length})</strong>
              </h4>
            </MDBCol>
            <MDBCol md={4} className="d-flex justify-content-end pe-4">
              <MDBBtn className="mb-0 me-2 px-5 btn-custom " size="md" onClick={() => setOpenAddTransportModal(true)}>Add Transport</MDBBtn>
              <AddTransport trip={trip} open={openAddTransportModal} close={closeAddTransportModal} fetchTransports={fetchTransports} setAlertData={setAlertData} />
            </MDBCol>
          </MDBRow>
        </MDBCardHeader>
        <MDBCardBody>
          { (transports.length !== 0) ? transports.map((d) => <TransportListItem key={d.destination_id} d={d} fetchTransports={fetchTransports} setAlertData={setAlertData} trip={trip} /> ) : <NoTransport trip={trip} open={openAddTransportModal} close={closeAddTransportModal} setOpen={setOpenAddTransportModal} setAlertData={setAlertData} fetchTransports={fetchTransports} />}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
}

TransportList.propTypes = {}

export default TransportList