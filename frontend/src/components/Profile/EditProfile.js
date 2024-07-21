import React from 'react'
import PropTypes from 'prop-types'
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';

const EditProfile = ({ open, close }) =>  {
  return (
    <MDBModal tabIndex='-1' open={open} onClose={close}>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader style={{backgroundColor: '#04b4bd'}}>
            <MDBModalTitle style={{color: 'white'}}>Edit Profile</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={close}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            
            
            
            <MDBRow className='my-3'>
              <MDBCol>
                <div class="form-outline ">
                  <label for="first_name" className='m-1 d-flex justify-content-start align-items-start' style={{color:"gray"}}>First Name</label>
                  <input type="text" class="form-control" id="first_name" style={{border: '1px solid lightgray'}} />
                </div>
              </MDBCol>
              <MDBCol>
                <div class="form-outline ">
                  <label for="last_name" className='m-1 d-flex justify-content-start align-items-start' style={{color:"gray"}}>Last Name</label>
                  <input type="text" class="form-control" id="last_name" style={{border: '1px solid lightgray'}} />
                </div>
              </MDBCol>

            </MDBRow>
            <MDBRow>

            <div class="form-outline">
              <label for="phone" className='m-1 d-flex justify-content-start' style={{color:"gray"}}>Phone</label>
              <input type="text" class="form-control" id="phone" style={{border: '1px solid lightgray'}} />
            </div>
            </MDBRow>

          </MDBModalBody>
          <MDBModalFooter className='d-flex justify-content-center'>
            <MDBBtn className='btn-custom'>Save</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  )
}

EditProfile.propTypes = {}

export default EditProfile