import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  MDBCardBody,
  MDBCard,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCardImage,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from 'mdb-react-ui-kit'
import destinationImg from '../../assets/destination.webp'
import { deleteDestination } from '../../services/api'
import EditDestination from './EditDestination'

const DestinationListItem = ({trip, d, fetchDestinations, setAlertData}) => {
  const [openEditDestinationModal, setOpenEditDestinationModal] = useState(false);
  const closeEditDestinationModal = () => {
    setOpenEditDestinationModal(false);
  }

  const handleDeleteDestination = async (e) => {
    e.preventDefault();
    try {
      const response = await deleteDestination(d.destination_id);
      if(response.status == 200){
        setAlertData({
          showAlert: true,
          severity: "success",
          message: `Destination "${d.destination_name}" deleted successfully.`
        })
        fetchDestinations();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditDestination = (e) => {
    e.preventDefault();
    setOpenEditDestinationModal(true);
  };

  return (
    <MDBContainer fluid className="mb-4">
      <EditDestination d={d} open={openEditDestinationModal} close={closeEditDestinationModal} fetchDestinations={fetchDestinations} trip={trip} setAlertData={setAlertData} />
      <MDBCard >
        <MDBCardBody className='m-1 p-2'>
          <MDBRow>
            <MDBCol size='3'>
              <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
                <MDBCardImage src={destinationImg} position='top' alt='..' style={{ objectFit: 'contain', width: '100%', height: '40%', borderRadius: '8px' }} />
              </div>
            </MDBCol>
            <MDBCol size='9'>
              <MDBRow>
                <MDBCol md={10} className="d-flex justify-content-start align-items-center">
                  <h4 className="mb-0 " style={{ color: '#04b4bd' }}>
                    <strong>{d.destination_name}</strong>
                  </h4>
                </MDBCol>
                <MDBCol md={2} className="d-flex justify-content-end">
                  <MDBDropdown>
                    <MDBDropdownToggle color='transparent' style={{boxShadow: 'none', color: '#04b4bd',fontSize:'14px'}}><i className="fas fa-ellipsis-v fa-xl"></i></MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem link onClick={handleEditDestination} >Edit</MDBDropdownItem>
                      <MDBDropdownItem link onClick={handleDeleteDestination} >Delete</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBCol>
              </MDBRow>
              <MDBRow className='mt-2' >
                <MDBCol md={5} className="ms-1 d-flex flex-column justify-content-center flex-grow-0">
                    <h5 style={{ color: 'gray' }}><MDBIcon fas icon="plane-arrival" className='me-2' style={{color: '#04b4bd'}} /> Arrival </h5>
                    <div className='ms-1 mt-1 d-flex flex-row justify-content-start flex-grow-0 gap-4'>
                        <div className='d-flex flex-row gap-2'>
                          <MDBIcon fas icon="calendar-day" style={{color: '#04b4bd'}} />
                          <h6 className="" style={{ color: 'gray' }}>
                            {d.arrival_date}
                          </h6>
                        </div>
                        <div className='d-flex flex-row gap-2'>
                          <MDBIcon fas icon="clock" style={{color: '#04b4bd'}} />
                          <h6 className="" style={{ color: 'gray' }}>
                            {d.arrival_time}
                          </h6>
                        </div>
                    </div>
                </MDBCol>
                <MDBCol md={5} className="d-flex flex-column justify-content-center flex-grow-0">
                    <h5 style={{ color: 'gray' }}>Departure <MDBIcon fas icon="plane-departure" className='me-2' style={{color: '#04b4bd'}} /> </h5>
                    <div className='ms-1 mt-1 d-flex flex-row justify-content-start align-items-center flex-grow-0 gap-4'>
                        <div className='d-flex flex-row gap-2'>
                          <MDBIcon fas icon="calendar-day" style={{color: '#04b4bd'}} />
                          <h6 className="" style={{ color: 'gray' }}>
                            {d.departure_date}
                          </h6>
                        </div>
                        <div className='d-flex flex-row gap-2'>
                          <MDBIcon fas icon="clock" style={{color: '#04b4bd'}} />
                          <h6 className="" style={{ color: 'gray' }}>
                            {d.departure_time}
                          </h6>
                        </div>
                    </div>
                </MDBCol>
              </MDBRow>
              <MDBRow className='mt-3'>
                <p style={{ color: 'gray', textWrap: 'pretty' }}>
                  {d.description || `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
                </p>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
}

DestinationListItem.propTypes = {}

export default DestinationListItem