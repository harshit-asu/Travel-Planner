import React, {useCallback, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBIcon,
  MDBRow,
  MDBBtn,
  MDBTooltip,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane, 
} from 'mdb-react-ui-kit';
import DestinationList from '../Destination/DestinationList';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Misc/Loading';
import { deleteTrip, getTrip } from '../../services/api';
import EditTrip from './EditTrip';
import CustomAlert from '../Misc/CustomAlert';
import ActivityList from '../Activity/ActivityList';
import TransportList from '../Transport/TransportList';
import AccommodationList from '../Accommodation/AccommodationList';


const Trip = props => {
  const [verticalActive, setVerticalActive] = useState('Destinations');
  const [trip, setTrip] = useState(null);
  const [alertData, setAlertData] = useState({
    showAlert: false,
    severity: "",
    message: ""
  });

  const [openEditTripModal, setOpenEditTripModal] = useState(false);

  const closeEditTripModal = () => {
    setOpenEditTripModal(false);
  }

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
  };

  const {trip_id} = useParams();
  const [isDataLoading, setIsDataLoading] = useState(true);

  const fetchTripData = useCallback(async () => {
    setIsDataLoading(true);
    const { data } = await getTrip(trip_id);
    setTrip(data.trips[0]);
    setIsDataLoading(false);
  }, [trip_id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTripData();
  }, [fetchTripData]);

  let navigate = useNavigate();

  const handleTripDeletion = async (e) => {
    e.preventDefault();
    try {
      const response = await deleteTrip(trip_id);
      navigate('/trips');
    } catch (error) {
      console.log(error);
    }
  }


  if(isDataLoading){
    return <Loading />
  }

  return (
    <MDBContainer fluid className="vh-100 mt-3">
      <CustomAlert alertData={alertData} setAlertData={setAlertData} />
    <MDBCard >
      <MDBCardHeader className="p-3">
        <MDBRow className='w-100'>
          <MDBCol md={4} className="d-flex flex-column justify-content-center">
            <h3 className="mb-0 ms-4 ps-2" style={{ color: '#04b4bd' }}>
              {/* <MDBIcon fas icon="chevron-right" className="me-2" /> */}
              <strong>{trip.trip_name}</strong>
            </h3>
            <p className="mb-0 ms-4 ps-3" style={{fontSize:"12px", color:"#803300"}}>Created by {trip.created_by}</p>
          </MDBCol>
          <MDBCol md={4} className="d-flex justify-content-center pe-5">
            
            <h5 className="mb-0 ms-4 ps-2 mt-3" style={{ color: 'grey' }}> <strong>{trip.start_date} - {trip.end_date}</strong></h5>
          
          </MDBCol>
          <MDBCol md={4} className="d-flex justify-content-end pe-5 py-3">
                            <MDBTooltip
                            tag="a"
                            wrapperProps={{ onClick: () => setOpenEditTripModal(true) }}
                            title="Edit"
                          >
                            <MDBIcon
                               fas
                               icon="pencil-alt"
                               size="lg"
                               className="me-3"
                               style={{color:"#04b4bd", cursor: 'pointer'}}
                            />
                          </MDBTooltip>
                          <EditTrip open={openEditTripModal} close={closeEditTripModal} trip={trip} fetchTripData={fetchTripData} setAlertData={setAlertData} />
                          <MDBTooltip
                            tag="a"
                            wrapperProps={{ onClick: handleTripDeletion }}
                            title="Delete"
                          >
                            <MDBIcon
                              fas
                              icon="trash-alt"
                              color="danger"
                              size="lg"
                              className="me-3"
                              style={{ cursor: 'pointer' }}
                            />
                            </MDBTooltip>

          </MDBCol>
          <MDBCol>

          </MDBCol>
        </MDBRow>
       
      </MDBCardHeader>
      <MDBCardBody style={{margin:'0'}}>
      <MDBRow>
        <MDBCol size='2'>
          <MDBTabs className='d-flex flex-grow-0 flex-column text-center'>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('Destinations')} active={verticalActive === 'Destinations'}>
              Destinations
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('Activities')} active={verticalActive === 'Activities'}>
              Activities
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('Transport')} active={verticalActive === 'Transport'}>
              Transport
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('Accomodation')} active={verticalActive === 'Accomodation'}>
              Accomodation
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('Expenses')} active={verticalActive === 'Expenses'}>
              Expenses
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('PackingList')} active={verticalActive === 'PackingList'}>
              Packing List
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('TripMembers')} active={verticalActive === 'TripMembers'}>
              Trip Members
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>
        <MDBCol size='10'>
          <MDBTabsContent>
            <MDBTabsPane open={verticalActive === 'Destinations'}><DestinationList trip={trip} /></MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'Activities'}><ActivityList trip={trip} /></MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'Transport'}><TransportList trip={trip} /></MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'Accomodation'}><AccommodationList trip={trip} /></MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'Expenses'}>Expenses content</MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'PackingList'}>Packing List content</MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'TripMembers'}>Trip Members List content</MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>

      </MDBCardBody>
      </MDBCard>
      </MDBContainer>
  )
}

Trip.propTypes = {}

export default Trip