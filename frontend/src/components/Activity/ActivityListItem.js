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
import activityImg from '../../assets/activity.webp'
import { deleteActivity } from '../../services/api'
import EditActivity from './EditActivity'

const ActivityListItem = ({trip, d, fetchActivities, setAlertData}) => {
  const [openEditActivityModal, setOpenEditActivityModal] = useState(false);
  const closeEditActivityModal = () => {
    setOpenEditActivityModal(false);
  }

  const handleDeleteActivity = async (e) => {
    e.preventDefault();
    try {
      const response = await deleteActivity(d.activity_id);
      if(response.status == 200){
        setAlertData({
          showAlert: true,
          severity: "success",
          message: `Activity "${d.activity_name}" deleted successfully.`
        })
        fetchActivities();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditActivity = (e) => {
    e.preventDefault();
    setOpenEditActivityModal(true);
  };

  return (
    <MDBContainer fluid className="mb-4">
      <EditActivity d={d} open={openEditActivityModal} close={closeEditActivityModal} fetchActivities={fetchActivities} trip={trip} setAlertData={setAlertData} />
      <MDBCard >
        <MDBCardBody className='m-1 p-2'>
          <MDBRow>
            <MDBCol size='3'>
              <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
                <MDBCardImage src={activityImg} position='top' alt='..' style={{ objectFit: 'contain', width: '100%', height: '40%', borderRadius: '8px' }} />
              </div>
            </MDBCol>
            <MDBCol size='9'>
              <MDBRow>
                <MDBCol md={10} className="d-flex justify-content-start align-items-center">
                  <h4 className="mb-0 " style={{ color: '#04b4bd' }}>
                    <strong>{d.activity_name}</strong>
                  </h4>
                </MDBCol>
                <MDBCol md={2} className="d-flex justify-content-end">
                  <MDBDropdown>
                    <MDBDropdownToggle color='transparent' style={{boxShadow: 'none', color: '#04b4bd',fontSize:'14px'}}><i className="fas fa-ellipsis-v fa-xl"></i></MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem link onClick={handleEditActivity} >Edit</MDBDropdownItem>
                      <MDBDropdownItem link onClick={handleDeleteActivity} >Delete</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBCol>
              </MDBRow>
              <MDBRow className='mt-2' >
                <MDBCol md={5} className="ms-1 d-flex flex-column justify-content-center flex-grow-0">
                    <h5 style={{ color: 'gray' }}><MDBIcon far icon="play-circle"  style={{color: '#04b4bd'}} /> Start </h5>
                    <div className='ms-1 mt-1 d-flex flex-row justify-content-start flex-grow-0 gap-4'>
                        <div className='d-flex flex-row gap-2'>
                          <MDBIcon fas icon="calendar-day" style={{color: '#04b4bd'}} />
                          <h6 className="" style={{ color: 'gray' }}>
                            {d.start_date}
                          </h6>
                        </div>
                        <div className='d-flex flex-row gap-2'>
                          <MDBIcon fas icon="clock" style={{color: '#04b4bd'}} />
                          <h6 className="" style={{ color: 'gray' }}>
                            {d.start_time}
                          </h6>
                        </div>
                    </div>
                </MDBCol>
                <MDBCol md={5} className="d-flex flex-column justify-content-center flex-grow-0">
                    <h5 style={{ color: 'gray' }}><MDBIcon far icon="stop-circle" style={{color: '#04b4bd'}} /> Stop</h5>
                    <div className='ms-1 mt-1 d-flex flex-row justify-content-start align-items-center flex-grow-0 gap-4'>
                        <div className='d-flex flex-row gap-2'>
                          <MDBIcon fas icon="calendar-day" style={{color: '#04b4bd'}} />
                          <h6 className="" style={{ color: 'gray' }}>
                            {d.end_date}
                          </h6>
                        </div>
                        <div className='d-flex flex-row gap-2'>
                          <MDBIcon fas icon="clock" style={{color: '#04b4bd'}} />
                          <h6 className="" style={{ color: 'gray' }}>
                            {d.end_time}
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

ActivityListItem.propTypes = {}

export default ActivityListItem