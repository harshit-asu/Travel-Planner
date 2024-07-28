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
import ActivityListItem from './ActivityListItem'
import AddActivity from './AddActivity'
import { getActivities } from '../../services/api'
import NoActivity from './NoActivity'
import Loading from '../Misc/Loading'
import CustomAlert from '../Misc/CustomAlert'

const ActivityList = ({ trip }) => {
  const [openAddActivityModal, setOpenAddActivityModal] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [alertData, setAlertData] = useState({
    showAlert: false,
    severity: "",
    message: ""
  })
  const closeAddActivityModal = () => {
    setOpenAddActivityModal(false);
  }

  const [activities, setActivities] = useState([]);

  const fetchActivities = useCallback(async () => {
    setIsDataLoading(true);
    try {
      const { data } = await getActivities(trip.trip_id);
      setActivities(data.activities);
    } catch (error) {
      console.log(error);
    }
    setIsDataLoading(false);
  }, [trip]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

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
                <strong>Activities ({activities.length})</strong>
              </h4>
            </MDBCol>
            <MDBCol md={4} className="d-flex justify-content-end pe-4">
              <MDBBtn className="mb-0 me-2 px-5 btn-custom " size="md" onClick={() => setOpenAddActivityModal(true)}>Add Activity</MDBBtn>
              <AddActivity trip={trip} open={openAddActivityModal} close={closeAddActivityModal} fetchActivities={fetchActivities} setAlertData={setAlertData} />
            </MDBCol>
          </MDBRow>
        </MDBCardHeader>
        <MDBCardBody>
          { (activities.length !== 0) ? activities.map((d) => <ActivityListItem key={d.destination_id} d={d} fetchActivities={fetchActivities} setAlertData={setAlertData} trip={trip} /> ) : <NoActivity trip={trip} open={openAddActivityModal} close={closeAddActivityModal} setOpen={setOpenAddActivityModal} setAlertData={setAlertData} fetchActivities={fetchActivities} />}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
}

ActivityList.propTypes = {}

export default ActivityList