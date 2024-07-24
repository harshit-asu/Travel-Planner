import React, { useState } from 'react'
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
import transportImg from '../../assets/transport.webp'
import { deleteTransport } from '../../services/api'
import EditTransport from './EditTransport'

const TransportListItem = ({trip, d, fetchTransports, setAlertData}) => {
  const [openEditTransportModal, setOpenEditTransportModal] = useState(false);
  const closeEditTransportModal = () => {
    setOpenEditTransportModal(false);
  }

  const handleDeleteTransport = async (e) => {
    e.preventDefault();
    try {
      const response = await deleteTransport(d.transport_id);
      if(response.status == 200){
        setAlertData({
          showAlert: true,
          severity: "success",
          message: `Transport "${d.transport_name}" deleted successfully.`
        })
        fetchTransports();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTransport = (e) => {
    e.preventDefault();
    setOpenEditTransportModal(true);
  };

  return (
    <MDBContainer fluid className="mb-4">
      <EditTransport d={d} open={openEditTransportModal} close={closeEditTransportModal} fetchTransports={fetchTransports} trip={trip} setAlertData={setAlertData} />
      <MDBCard >
        <MDBCardBody className='m-1 p-2'>
          <MDBRow>
            <MDBCol size='3'>
              <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
                <MDBCardImage src={transportImg} position='top' alt='..' style={{ objectFit: 'contain', width: '100%', height: '40%', borderRadius: '8px' }} />
              </div>
            </MDBCol>
            <MDBCol size='9'>
              <MDBRow>
                <MDBCol md={10} className="d-flex justify-content-start align-items-center">
                  <div className='d-flex flex-row justify-content-around gap-3 flex-grow-0 align-items-center'>
                  <h4 className="mb-0 " style={{ color: '#04b4bd' }}>
                    <strong>{d.departure_location}</strong>
                  </h4>
                  <MDBIcon fas icon="fighter-jet" style={{ color: '#04b4bd' }} />
                  <h4 className="mb-0 " style={{ color: '#04b4bd' }}>
                    <strong>{d.arrival_location}</strong>
                  </h4>
                  </div>
                </MDBCol>
                <MDBCol md={2} className="d-flex justify-content-end">
                  <MDBDropdown>
                    <MDBDropdownToggle color='transparent' style={{boxShadow: 'none', color: '#04b4bd',fontSize:'14px'}}><i className="fas fa-ellipsis-v fa-xl"></i></MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem link onClick={handleEditTransport} >Edit</MDBDropdownItem>
                      <MDBDropdownItem link onClick={handleDeleteTransport} >Delete</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBCol>
              </MDBRow>
              <MDBRow className='mt-2' >
                <MDBCol md={4} className="ms-1 d-flex flex-column justify-content-center flex-grow-0">
                    <h5 style={{ color: 'gray' }}> Departure <MDBIcon fas icon="plane-departure"  style={{color: '#04b4bd'}} /> </h5>
                    <div className='ms-1 mt-1 d-flex flex-row justify-content-start flex-grow-0 gap-4'>
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
                <MDBCol md={4} className="d-flex flex-column justify-content-center flex-grow-0">
                    <h5 style={{ color: 'gray' }}><MDBIcon fas icon="plane-arrival me-1" style={{color: '#04b4bd'}} /> Arrival</h5>
                    <div className='ms-1 mt-1 d-flex flex-row justify-content-start align-items-center flex-grow-0 gap-4'>
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
                <MDBCol md={2} className="d-flex flex-column justify-content-center align-items-end">
                    <h5 style={{ color: 'gray' }}><MDBIcon far icon="money-bill-alt" style={{color: '#04b4bd'}} /> Cost</h5>
                    <h6 className="" style={{ color: 'gray' }}>
                      {d.cost ? `$ ${d.cost}` : 'Not added'}
                    </h6>
                </MDBCol>
              </MDBRow>
              <MDBRow className='mt-3'>
                <p style={{ color: 'gray', textWrap: 'pretty' }}>
                  {d.description || `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.`}
                </p>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
}

TransportListItem.propTypes = {}

export default TransportListItem