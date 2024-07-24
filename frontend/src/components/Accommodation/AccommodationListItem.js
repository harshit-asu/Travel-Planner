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
import accommodationImg from '../../assets/accommodation.webp'
import { deleteAccommodation } from '../../services/api'
import EditAccommodation from './EditAccommodation'

const AccommodationListItem = ({trip, d, fetchAccommodations, setAlertData}) => {
  const [openEditAccommodationModal, setOpenEditAccommodationModal] = useState(false);
  const closeEditAccommodationModal = () => {
    setOpenEditAccommodationModal(false);
  }

  const handleDeleteAccommodation = async (e) => {
    e.preventDefault();
    try {
      const response = await deleteAccommodation(d.accommodation_id);
      if(response.status == 200){
        setAlertData({
          showAlert: true,
          severity: "success",
          message: `Accommodation "${d.accommodation_name}" deleted successfully.`
        })
        fetchAccommodations();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditAccommodation = (e) => {
    e.preventDefault();
    setOpenEditAccommodationModal(true);
  };

  return (
    <MDBContainer fluid className="mb-4">
      <EditAccommodation d={d} open={openEditAccommodationModal} close={closeEditAccommodationModal} fetchAccommodations={fetchAccommodations} trip={trip} setAlertData={setAlertData} />
      <MDBCard >
        <MDBCardBody className='m-1 p-2'>
          <MDBRow>
            <MDBCol size='3'>
              <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
                <MDBCardImage src={accommodationImg} position='top' alt='..' style={{ objectFit: 'contain', width: '100%', height: '40%', borderRadius: '8px' }} />
              </div>
            </MDBCol>
            <MDBCol size='9'>
              <MDBRow>
                <MDBCol md={10} className="d-flex justify-content-start align-items-center">
                  <h4 className="mb-0 " style={{ color: '#04b4bd' }}>
                    <strong>{d.accommodation_name}</strong>
                  </h4>
                </MDBCol>
                <MDBCol md={2} className="d-flex justify-content-end">
                  <MDBDropdown>
                    <MDBDropdownToggle color='transparent' style={{boxShadow: 'none', color: '#04b4bd',fontSize:'14px'}}><i className="fas fa-ellipsis-v fa-xl"></i></MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem link onClick={handleEditAccommodation} >Edit</MDBDropdownItem>
                      <MDBDropdownItem link onClick={handleDeleteAccommodation} >Delete</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBCol>
              </MDBRow>
              <MDBRow className='mt-2' >
                <MDBCol md={4} className="ms-1 d-flex flex-column justify-content-center flex-grow-0">
                    <h5 style={{ color: 'gray' }}><MDBIcon fas icon="sign-in-alt me-1"  style={{color: '#04b4bd'}} /> Check In </h5>
                    <div className='ms-1 mt-1 d-flex flex-row justify-content-start flex-grow-0 gap-4'>
                        <div className='d-flex flex-row gap-2'>
                          <MDBIcon fas icon="calendar-day" style={{color: '#04b4bd'}} />
                          <h6 className="" style={{ color: 'gray' }}>
                            {d.check_in_date}
                          </h6>
                        </div>
                        <div className='d-flex flex-row gap-2'>
                          <MDBIcon fas icon="clock" style={{color: '#04b4bd'}} />
                          <h6 className="" style={{ color: 'gray' }}>
                            {d.check_in_time}
                          </h6>
                        </div>
                    </div>
                </MDBCol>
                <MDBCol md={4} className="d-flex flex-column justify-content-center flex-grow-0">
                    <h5 style={{ color: 'gray' }}>Check Out <MDBIcon fas icon="sign-out-alt ms-1" style={{color: '#04b4bd'}} /> </h5>
                    <div className='ms-1 mt-1 d-flex flex-row justify-content-start align-items-center flex-grow-0 gap-4'>
                        <div className='d-flex flex-row gap-2'>
                          <MDBIcon fas icon="calendar-day" style={{color: '#04b4bd'}} />
                          <h6 className="" style={{ color: 'gray' }}>
                            {d.check_out_date}
                          </h6>
                        </div>
                        <div className='d-flex flex-row gap-2'>
                          <MDBIcon fas icon="clock" style={{color: '#04b4bd'}} />
                          <h6 className="" style={{ color: 'gray' }}>
                            {d.check_out_time}
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

AccommodationListItem.propTypes = {}

export default AccommodationListItem