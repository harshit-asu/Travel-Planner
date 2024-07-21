import React from 'react'
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
  MDBCardImage,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem

} from 'mdb-react-ui-kit'
import destinationImg from '../../assets/destination.webp'

const DestinationListItem = props => {

  return (
    <MDBContainer fluid className="vh-100 ">
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
                <MDBCol md={6} className="d-flex justify-content-start ">
                  <h5 className="mb-0 " style={{ color: '#04b4bd' }}>
                    <strong><u>Destination Name </u></strong>
                  </h5>
                </MDBCol>
                <MDBCol md={5} className="d-flex justify-content-start ">
                  <h6 className="mb-0 pt-2" style={{ color: 'gray' }}>
                    7/19/2024 - 7/19/2024
                  </h6>
                </MDBCol>
                <MDBCol md={1} className="d-flex justify-content-end ">
                  

                  <MDBDropdown>
                    <MDBDropdownToggle color='transparent' style={{boxShadow: 'none', color: '#04b4bd',fontSize:'14px'}}><i className="fas fa-ellipsis-v fa-xl"></i></MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem link>Edit</MDBDropdownItem>
                      <MDBDropdownItem link>Delete</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>

                </MDBCol>

              </MDBRow>
              <MDBRow className='mt-3'>
                <p>
                  Malibu, California is a beach city in Los Angeles County known for its 21-mile stretch of beaches along the Pacific Ocean. The city is also known for its Mediterranean climate, surfing, and for being a former home to many Hollywood celebrities.

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